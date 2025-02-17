import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginUser(request, response) {
  try {
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).json({
        message: "Email is required",
        error: true,
        success: false,
      });
    }

    if (!password) {
      return response.status(400).json({
        message: "Password is required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(404).json({
        message: "User not registered",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(401).json({
        message: "Check your passsword",
        error: true,
        success: false,
      });
    }

    const tokenData = {
      id: user?._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("token", token, cookiesOption);

    return response.json({
      message: "User logged in successfully",
      error: false,
      success: true,
      data: token,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
