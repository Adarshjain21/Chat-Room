import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Avatar from "./Avatar";
import { FaAngleLeft } from "react-icons/fa";
import UploadImageVideo from "./UploadImageVideo";
import { useSelector } from "react-redux";
import moment from "moment";
import { styled } from "@mui/system"; // Import styled from Material-UI

// Scrollable Box Component
const ScrollableBox = styled("div")({
  overflowY: "scroll",
  maxHeight: "calc(100vh - 200px)",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#c2d8f2",
    borderRadius: "10px",
    border: "2px solid #ffffff",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#1e40af",
  },
});

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

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage]);

  useEffect(() => {
    if (socket) {
      socket.emit("message-page", params.userId);
      socket.emit("seen", params.userId);

      socket.on("message-user", (data) => {
        setDataUser(data);
      });

      socket.on("message", (data) => {
        setAllMessage(data);
      });
    }
  }, [socket, params.userId, user]);

  const handleOnChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socket) {
        socket.emit("new message", {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
        setMessage({ text: "", imageUrl: "", videoUrl: "" });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 rounded-2xl">
      {/* Navbar */}
      <div className="flex items-center p-4 bg-blue-200 text-gray-800 shadow-md rounded-t-2xl gap-4 h-20">
        <Link to={"/"} className="lg:hidden">
          <FaAngleLeft size={25} />
        </Link>
        <Avatar
          width={40}
          height={40}
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

      {/* Chat Section with Scrollable Box */}
      <ScrollableBox className="flex flex-col gap-2 py-2 mx-2 px-3 h-[calc(100vh-200px)]">
        {allMessage.map((msg, index) => (
          <div
            key={index}
            className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
              user._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"
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
        ))}
      </ScrollableBox>

      {/* Input Field */}
      <div className="p-3 bg-white shadow-md flex items-center rounded-b-2xl">
        {/* <UploadImageVideo /> */}
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
