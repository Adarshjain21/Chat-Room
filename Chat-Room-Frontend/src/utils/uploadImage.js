import React from 'react'

const uploadImage = async(image) => {
  try {
    const formData = new FormData();

    formData.append("image", image);

    const URL = `${import.meta.env.VITE_API_URL}/api/upload-image`;

    const response = await axios.put(URL, formData)

    return response
  } catch (error) {
    return error
  }
}

export default uploadImage
