import uploadImageCloudinary from "../helpers/uploadImageCloudinary.js";
import UserModel from "../models/user.model.js";

export async function uploadAvatar(req, res) {
  try {
    const userId = req.body.userId;
    const image = req.file;

    console.log("userId09", userId);

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: upload.url },
      { new: true }
    );

    req.io.emit("avatarUpdated", {
      userId: updateUser._id,
      avatar: updateUser.avatar,
    });

    return res.json({
      message: "upload profile",
      error: false,
      success: true,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
