import Router from "express";
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { userDetails } from "../controllers/userDetails.js";
import { logout } from "../controllers/logout.js";
import { updateUserDetails } from "../controllers/updateUserDetails.js";
import { searchUser } from "../controllers/searchUser.js";
import { uploadAvatar } from "../controllers/uploadAvatar.js";
import upload from "../middleware/multer.js";
import uploadImageController from "../controllers/uploadImage.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user-details", userDetails);
router.get("/logout", logout);
router.post("/update-user", updateUserDetails);
router.post("/search-user", searchUser);
router.put("/upload-avatar", upload.single("avatar"), uploadAvatar);
router.post("/upload-image", upload.single("image"), uploadImageController);

export default router;
