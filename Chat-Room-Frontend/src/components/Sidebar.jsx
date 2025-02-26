import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  Box,
  Typography,
  InputBase,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  styled,
  Drawer,
} from "@mui/material";
import Profile from "./Profile";
// import DropDownMenu from "./DropDownMenu";
// import UserDropDownMenu from "./UserDropDownMenu";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import DropDownMenu from "./DropDownMenu";
import { NavLink } from "react-router-dom";

// Styled Components
const SearchInput = styled(InputBase)({
  marginLeft: 8,
  flex: 1,
  color: "#1e40af",
  "& ::placeholder": {
    color: "#60a5fa",
  },
});

const ScrollableBox = styled(Box)({
  overflowY: "scroll",
  maxHeight: "calc(100vh - 200px)",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#60a5fa",
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

const Sidebar = ({ user, socket }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("sidebar", user._id);

      socket.on("conversation", (data) => {
        console.log("conversation", data);

        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setAllUser(conversationUserData);
      });
    }
  }, [socket, user]);

  // const fetchFriends = async () => {
  //   try {
  //     const response = await Axios({
  //       ...SummaryApi.getFriends,
  //     });

  //     const { data: responseData } = response;

  //     console.log(90000000, responseData);

  //     if (responseData.success) {
  //       // setFriends(responseData.data);
  //       dispatch(setAllFriends(responseData.data));
  //     }
  //   } catch (error) {
  //     AxiosToastError(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFriends();
  // }, []);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "16px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        maxHeight: "100vh",
        height: "93vh",
        // width: "250px"
      }}
    >
      {/* Profile Drawer */}
      <div className="flex justify-between items-center">
        <div>
          <Button onClick={toggleDrawer(true)}>
            <img
              src={
                user?.avatar ||
                "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
              }
              className="h-12 border rounded-full ml-[10px] mt-[10px]"
              alt="User Avatar"
            />
          </Button>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                top: "25px",
                bottom: "25px",
                left: "25px",
                // width: "auto",
                borderRadius: "10px",
                width: "500px",
                maxWidth: "calc(100% - 30px)",
                maxHeight: "calc(100% - 50px)",
              },
            }}
          >
            <Profile user={user} />
          </Drawer>
        </div>

        <div className="flex justify-center items-center">
          <div>
            <SearchUser />
          </div>
          <div>
            <DropDownMenu />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "4px 12px",
          }}
        >
          <BsSearch color="#60a5fa" />
          <SearchInput placeholder="Search chats..." />
        </Box>
      </Box>

      {/* Chat List */}

      {allUser.length === 0 && (
        <div className="mt-12">
          <div className="flex justify-center items-center my-4 text-slate-500">
            <FiArrowUpLeft size={50} />
          </div>
          <p className="text-lg text-center text-slate-400">
            Explore users to start a conversation with.
          </p>
        </div>
      )}
      <ScrollableBox>
        <List>
          {allUser.map((conv, index) => {
            console.log("conv", conv);

            return (
              <>
              <NavLink
                to={"/" + conv?.userDetails?._id}
                key={conv?._id}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-2 border border-transparent rounded hover:bg-slate-100 cursor-pointer ${
                    isActive ? "bg-slate-100" : ""
                  }`
                }
              >
                <div>
                  <Avatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="w-full">
                  <div className="text-ellipsis line-clamp-1 font-semibold text-base w-full flex justify-between items-center">
                    <div>
                      {conv?.userDetails?.firstname}{" "}
                      {conv?.userDetails?.lastname} (
                      {conv?.userDetails?.username})
                    </div>
                    <div>
                      {" "}
                      {new Date(conv?.lastMsg?.createdAt).toLocaleTimeString(
                        "en-GB",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </div>
                  </div>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center w-full">
                    <p className="text-ellipsis line-clamp-1 text-[15px]">
                      {conv?.lastMsg?.text}
                    </p>
                    {Boolean(conv?.unseenMsg) && (
                      <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-green-600 text-white font-semibold rounded-full">
                        {conv?.unseenMsg}
                      </p>
                    )}
                    </div>
                  </div>
                </div>
              </NavLink>
              <div className="border-1 border-slate-200">
              </div>
              </>
            );
          })}
        </List>
      </ScrollableBox>
    </Box>
  );
};

export default Sidebar;
