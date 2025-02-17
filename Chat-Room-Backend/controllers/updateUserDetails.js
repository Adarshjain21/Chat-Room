import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";
import UserModel from "../models/user.model.js";

export async function updateUserDetails(request, response) {
  try {
    const token = request.cookies.token || "";

    if (!token) {
      return response.status(401).json({
        message: "Unauthorized: No token provided",
        error: true,
      });
    }

    const user = await getUserDetailsFromToken(token);

    const { firstname, lastname, avatar } = request.body;

    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      {
        firstname,
        lastname,
        avatar,
      }
    );

    const userInformation = await UserModel.findById(user._id);

    return response.json({
      message: "User details updated successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
