import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import fetchUserDetails from "./utils/fetchUserDetails";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUser(userData.data));
  };

  // const fetchUserDetails = async()=>{
  //         try {
  //             const URL = `${import.meta.env.VITE_API_URL}/api/user-details`
  //             const response = await axios({
  //               url : URL,
  //               withCredentials : true
  //             })

  //             dispatch(setUser(response.data.data))

  //             if(response.data.data.logout){
  //                 dispatch(logout())
  //                 navigate("/login")
  //             }
  //             console.log("current user Details",response)
  //         } catch (error) {
  //             console.log("error",error)
  //         }
  //       }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
