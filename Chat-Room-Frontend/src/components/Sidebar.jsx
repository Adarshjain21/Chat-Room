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

const Sidebar = ({ user, setPersonId }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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
                width: "auto",
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
        <div><DropDownMenu /></div>
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
            return (
              <NavLink
                to={"/" + conv?.userDetails?._id}
                key={conv?._id}
                className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer"
              >
                <div>
                  <Avatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                    {conv?.userDetails?.name}
                  </h3>
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
                    <p className="text-ellipsis line-clamp-1">
                      {conv?.lastMsg?.text}
                    </p>
                  </div>
                </div>
                {Boolean(conv?.unseenMsg) && (
                  <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                    {conv?.unseenMsg}
                  </p>
                )}
              </NavLink>
            );
          })}
        </List>
      </ScrollableBox>

      {/* {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )} */}
    </Box>
  );
};

export default Sidebar;
