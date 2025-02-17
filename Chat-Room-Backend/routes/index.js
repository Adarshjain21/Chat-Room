import Router from "express";
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { userDetails } from "../controllers/userDetails.js";
import { logout } from "../controllers/logout.js";
import { updateUserDetails } from "../controllers/updateUserDetails.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user-details", userDetails);
router.get("/logout", logout);
router.post("/update-user", updateUserDetails)

export default router;
