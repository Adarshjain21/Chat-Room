import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function registerUser(request, response) {
  try {
    const { firstname, lastname, username, email, password } = request.body;

    if (!firstname) {
      return response.status(400).json({
        message: "First name is required",
        error: true,
        success: false,
      });
    }

    if (!lastname) {
      return response.status(400).json({
        message: "Last name is required",
        error: true,
        success: false,
      });
    }

    if (!username) {
      return response.status(400).json({
        message: "Username is required",
        error: true,
        success: false,
      });
    }

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

    const checkEmail = await UserModel.findOne({ email }); //{ name,email}  // null

    if (checkEmail && checkEmail.username === username) {
      return response.status(400).json({
        message: "Username already exists",
        error: true,
        success: false,
      });
    }

    if (checkEmail) {
      return response.status(400).json({
        message: "Already user exists",
        error: true,
        success: false,
      });
    }

    //password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      firstname,
      lastname,
      username,
      email,
      password: hashpassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return response.status(201).json({
      message: "User created successfully",
      data: userSave,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
