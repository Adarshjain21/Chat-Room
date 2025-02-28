import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  const isOnline = onlineUser.includes(userId);

  let avatarName = "";
  if (name) {
    const splitName = name.split(" ");
    avatarName = splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="w-full h-full object-cover relative  rounded-full "
        />
      ) : name ? (
        <div
          className={`w-full h-full flex items-center justify-center text-lg font-bold rounded-full text-slate-800 ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} className="text-gray-400" />
      )}

      {isOnline && (
        <div className="bg-green-500 border-2 border-white w-3 h-3 absolute bottom-0 right-0 rounded-full z-10"></div>
      )}
    </div>
  );
};

export default Avatar;
