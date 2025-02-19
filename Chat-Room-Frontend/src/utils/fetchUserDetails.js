import axios from "axios";

const fetchUserDetails = async () => {
  const URL = `${import.meta.env.VITE_API_URL}/api/user-details`;

  try {
    const response = await axios({
      url: URL,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
