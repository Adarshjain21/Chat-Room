import React, { useEffect, useState } from "react";
import { Edit2, Camera } from "lucide-react";
import axios from "axios";
import { setUser, updatedAvatar } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = ({ user, socket }) => {
  const [name, setName] = useState(user.firstname + " " + user.lastname);
  const [about, setAbout] = useState("Hey there! I am using Chat Room.");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    console.log("userData", userData.data);

    dispatch(setUser(userData.data));
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    console.log("file19", file);

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id);

    if (!file) {
      return;
    }
    const URL = `${import.meta.env.VITE_API_URL}/api/upload-avatar`;
    try {
      setLoading(true);
      const response = await axios.put(URL, formData);

      console.log("response34", response);

      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
      fetchUser();
      
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Listen for avatar updates from other users
    socket.on("avatarUpdated", ({ userId, avatar }) => {
      if (userId === user._id) {
        console.log("avatarUpdated58", avatar);
        
        dispatch(updatedAvatar(avatar));
      }
    });

    return () => {
      socket.off("avatarUpdated");
    };
  }, [user._id, dispatch, socket]);

  const renderProfilePhoto = () => (
    <div className="relative mb-6">
      <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Camera className="w-16 h-16 text-gray-400" />
        )}
        <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer">
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="avatar">
              <Camera className="w-6 h-6 text-gray-600 cursor-pointer" />
            </label>
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={handleUploadAvatarImage}
            />
          </form>
        </div>
      </div>
    </div>
  );

  const renderNameSection = () => (
    <div className="text-center mt-4">
      <div className="flex items-center justify-center space-x-2">
        {isEditingName ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            className="bg-white/50 text-gray-800 text-xl text-center rounded px-2 py-1"
            autoFocus
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        )}
        {/* <button onClick={() => setIsEditingName(true)}>
          <Edit2 className="w-5 h-5 text-blue-600 hover:text-blue-700" />
        </button> */}
      </div>
      <p className="text-gray-500 text-sm">@{user.username}</p>
    </div>
  );

  const renderInfoSection = (
    label,
    value,
    isEditable = false,
    editState,
    setEditState,
    editHandler
  ) => (
    <div className="bg-white/50 p-4 rounded-lg shadow-sm hover:bg-white/60 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-500">{label}</p>
          {isEditable && editState ? (
            <input
              type="text"
              value={value}
              onChange={(e) => editHandler(e.target.value)}
              onBlur={() => setEditState(false)}
              className="bg-transparent text-gray-800 w-full focus:outline-none"
              autoFocus
            />
          ) : (
            <p className="text-gray-800">{value}</p>
          )}
        </div>
        {/* {isEditable && (
          <button onClick={() => setEditState(true)}>
            <Edit2 className="w-5 h-5 text-blue-600 hover:text-blue-700" />
          </button>
        )} */}
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white/80 p-3 md:p-4 flex items-center shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Profile</h1>
      </div>
      <div className="flex flex-col items-center py-8">
        {renderProfilePhoto()}
        {renderNameSection()}
        <div className="w-full max-w-md px-6 space-y-4 mt-6">
          {renderInfoSection("Email", user.email)}
          {renderInfoSection(
            "About",
            about,
            true,
            isEditingAbout,
            setIsEditingAbout,
            setAbout
          )}
          {/* {renderInfoSection(
            "Online Status",
            user.onlineStatus ? "Online" : "Offline",
            false,
            null,
            null,
            null
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
