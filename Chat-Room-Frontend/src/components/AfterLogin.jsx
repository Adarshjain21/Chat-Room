import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import io from "socket.io-client";
import { setOnlineUser } from "../redux/userSlice";

const AfterLogin = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const onlineUser = useSelector((state) => state.user.onlineUser);

  const basePath = location.pathname === "/";

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_API_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      console.log("Online user:", data);
      dispatch(setOnlineUser(data));
    });

    // console.log("socketConnection", socketConnection);
    setSocket(socketConnection);
    // dispatch(setSocketConnection(socketConnection))

    socketConnection.on("userDisconnected", (data) => {
      dispatch(setOnlineUser(data));
    });
    
    return () => {
      socketConnection.disconnect();
    };
  }, [dispatch]);

  const context = {
    socket: socket,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-200 to-blue-50 p-3 sm:p-6 flex gap-5">
      <div
        className={`w-full lg:w-[50%] lg:max-w-[500px] ${
          !basePath && "hidden"
        } lg:block`}
      >
        <Sidebar user={user} socket={socket}/>
      </div>

      <div className={`w-full ${basePath && "hidden"}`}>
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.7)", // light glass effect
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            flexDirection: "column",
            height: "93vh", // full viewport height; adjust as needed
            width: "100%",
          }}
        >
          <Outlet context={context} />
        </Box>
      </div>

      <div
        className={`hidden ${
          !basePath ? "hidden" : "lg:block"
        } w-full h-[93vh]`}
      >
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.7)", // light glass effect
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            flexDirection: "column",
            height: "93vh", // full viewport height; adjust as needed
            width: "100%",
          }}
        >
          <div
            className={`h-full flex-col items-center justify-center p-6 hidden ${
              !basePath ? "hidden" : "lg:flex"
            }`}
          >
            <div className="relative flex flex-col items-center">
              <img
                src="/src/assets/chat-room-logo.png"
                alt="Chat Room Preview"
                className="w-96 rounded-lg shadow-lg border border-gray-700"
              />
            </div>
            <h1 className="text-3xl font-semibold mt-6">
              Welcome to Chat Room
            </h1>
            <p className="text-gray-400 mt-2 text-center">
              Connect, chat, and share experiences with people around the world
              in our Chat Room.
            </p>
            <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md text-lg hover:bg-green-600">
              Join Now
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              Your conversations are end-to-end encrypted.
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AfterLogin;
