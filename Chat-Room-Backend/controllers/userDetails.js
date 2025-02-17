import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";

export async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";

    if (!token) {
      return response.status(401).json({
        message: "Unauthorized: No token provided",
        error: true,
      });
    }

    const user = await getUserDetailsFromToken(token);

    if (!user || user.logout) {
      return response.status(401).json({
        message: user.message || "Unauthorized",
        error: true,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}
