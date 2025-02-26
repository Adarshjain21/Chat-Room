import React, { useCallback, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FaImage, FaPlus, FaVideo } from "react-icons/fa";

const UploadImageVideo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const open = Boolean(anchorEl);

  const handleMenuClick = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.top - 20, // Move it a little higher
      left: rect.left + 90, // Move it a little to the right
    });
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file upload logic here
    }
    handleMenuClose(); // Close the menu after file selection
  };

  return (
    <div>
      <Button
        id="menu-button"
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuClick}
      >
        <FaPlus size={20} />
      </Button>

      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "menu-button" }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: menuPosition.top, left: menuPosition.left }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MenuItem>
          <label style={{ cursor: "pointer", width: "100%" }} className="flex items-center gap-3">
            <div className="text-[#00acb4]">
              <FaImage size={18} />
            </div>
            Image
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </MenuItem>
        <MenuItem>
          <label style={{ cursor: "pointer", width: "100%" }} className="flex items-center gap-3">
            <div className="text-purple-500">
              <FaVideo size={18} />
            </div>
            Video
            <input
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UploadImageVideo;
