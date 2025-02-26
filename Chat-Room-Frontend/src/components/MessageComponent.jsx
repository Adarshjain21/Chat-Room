import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Avatar from "./Avatar";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import UploadImageVideo from "./UploadImageVideo";
import { useSelector } from "react-redux";
import moment from 'moment'

const MessageComponent = () => {
  const params = useParams();
  const { socket } = useOutletContext();
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    username: "",
    avatar: "",
    email: "",
    _id: "",
  });
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [allMessage, setAllMessage] = useState([]);
  const endOfMessagesRef = useRef(null);


  console.log("params9999999", params);

  console.log("context123", socket);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage]);

  useEffect(() => {
    if (socket) {

      socket.emit("message-page", params.userId);

      socket.emit("seen", params.userId);

      socket.on("message-user", (data) => {
        console.log("user details", data);
        setDataUser(data);
      });

      socket.on("message", (data) => {
        console.log("data", data);
        setAllMessage(data);
      });
    }
  }, [socket, params.userId, user]);

  console.log("dataUser", dataUser);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(value, name);

    setMessage((preve) => {
      return {
        ...preve,
        text: value,
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socket) {
        console.log("hyy7");

        socket.emit("new message", {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };

  // console.log("allMessage", allMessage);

  return (
    <div className="flex flex-col h-screen bg-gray-100 rounded-2xl">
      {/* Navbar */}
      <div className="flex items-center  p-4 bg-blue-200 text-gray-800 shadow-md rounded-2xl gap-4">
        <Link to={"/"} className="lg:hidden">
          <FaAngleLeft size={25} />
        </Link>
        <Avatar
          width={50}
          height={50}
          imageUrl={dataUser?.avatar}
          name={dataUser?.username}
          userId={dataUser?._id}
        />
        <div>
          <span className="text-lg font-semibold">{dataUser.username}</span>
          <p className="-my-2 text-sm">
            {dataUser.online ? (
              <span className="text-[#03bafc]">online</span>
            ) : (
              <span className="text-slate-400">offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Chat Section */}
      {/* <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {allMessage.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.sender === "me"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div> */}
      <div className="flex flex-col gap-2 overflow-y-auto py-2 mx-2 h-[calc(100vh-200px)]">
        {allMessage.map((msg, index) => {
          return (
            <div
              className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                user._id === msg?.msgByUserId
                  ? "ml-auto bg-teal-100"
                  : "bg-white"
              }`}
            >
              <div className="w-full relative">
                {msg?.imageUrl && (
                  <img
                    src={msg?.imageUrl}
                    className="w-full h-full object-scale-down"
                  />
                )}
                {msg?.videoUrl && (
                  <video
                    src={msg.videoUrl}
                    className="w-full h-full object-scale-down"
                    controls
                  />
                )}
              </div>
              <div className="flex items-end">
              <span className="px-2">{msg.text}</span>
              <sub className="text-xs ml-auto w-fit">
                {moment(msg.createdAt).format("hh:mm")}
              </sub>
              </div>
              <div ref={endOfMessagesRef} />
            </div>
          );
        })}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white shadow-md flex items-center rounded-2xl">
        <div>
          <UploadImageVideo />
        </div>
        <form onSubmit={handleSendMessage} className="flex w-full">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg outline-none w-full"
            placeholder="Type a message..."
            value={message.text}
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageComponent;
