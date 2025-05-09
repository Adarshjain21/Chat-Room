import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FaUserPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import axios from "axios";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    width: "500px", // Adjust width
    height: "500px", // Adjust height
    maxWidth: "90vw", // Prevents overflow on small screens
    maxHeight: "90vh", // Prevents overflow on small screens
    borderRadius: 16,
    padding: 16,
  },
});

const SearchUser = ({ onClose }) => {
  const [open, setOpen] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchUser = async () => {
    const URL = `${import.meta.env.VITE_API_URL}/api/search-user`;
    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      console.log("response47777777", response);
      setLoading(false);

      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  React.useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <>
      <div onClick={handleClickOpen} className="text-blue-800 cursor-pointer">
        <FaUserPlus size={20} />
      </div>

      <BootstrapDialog
        onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New User
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <div className="bg-white rounded flex items-center p-2 mt-2 border">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full bg-transparent focus:outline-none px-3 py-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="p-2">
            <IoSearchOutline size={25} />
          </button>
        </div>

        {/**display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/**no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}

          {loading && (
            <p>
              <Loading />
            </p>
          )}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <UserSearchCard
                  key={user._id}
                  user={user}
                  onClose={handleClose}
                />
              );
            })}
        </div>
      </BootstrapDialog>
    </>
  );
};

export default SearchUser;
