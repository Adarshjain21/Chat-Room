import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const getUserDetailsFromToken = async (token) => {
  try {
    if (!token) {
      return { message: "Session expired", logout: true };
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decode.id).select("-password");

    if (!user) {
      return { message: "User not found", logout: true };
    }

    return user;
  } catch (error) {
    return { message: "Invalid token", logout: true };
  }
};

export default getUserDetailsFromToken;
