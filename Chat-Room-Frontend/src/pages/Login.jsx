import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const bubbleVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.5],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const chatMessages = [
  { text: "Hey! How are you?", sender: "left" },
  { text: "I'm good! What about you?", sender: "right" },
  { text: "Doing great! Excited for the launch!", sender: "left" },
  { text: "Same here! Can't wait!", sender: "right" },
];

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await Axios({
  //         ...SummaryApi.login,
  //         data: data,
  //       });

  //       const { data: responseData } = response;

  //       if (responseData.error) {
  //         toast.error(responseData.message);
  //       }

  //       if (responseData.success) {
  //         toast.success(responseData.message);
  //         localStorage.setItem("accessToken", responseData.data.accessToken);
  //         localStorage.setItem("refreshToken", responseData.data.refreshToken);

  //         const userDetails = await fetchUserDetails();
  //         dispatch(setUserDetails(userDetails.data));

  //         setData({
  //           email: "",
  //           password: "",
  //         });
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       AxiosToastError(error);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `${import.meta.env.VITE_API_URL}/api/login`;

    try {
      setLoading(true);
      const response = await axios.post(URL, data, { withCredentials: true });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        dispatch(setToken(responseData.token));
        localStorage.setItem("token", responseData.token);

        const userDetails = await fetchUserDetails();
        dispatch(setUser(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-blue-500 via-purple-400 to-stone-300 flex flex-col items-center justify-center px-6 sm:px-12">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-white/30 rounded-full shadow-lg"
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
        />
      ))}

      <div className="hidden absolute top-1/4 left-4 right-4 sm:flex flex-col gap-4">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={index}
            className={`px-4 py-2 rounded-lg shadow-md max-w-xs ${
              msg.sender === "left"
                ? "bg-blue-200 self-start"
                : "bg-green-200 self-end"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <div className="absolute top-24 left-4 right-4 flex sm:hidden flex-col gap-4">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={index}
            className={`px-4 py-2 rounded-lg shadow-md max-w-xs ${
              msg.sender === "left"
                ? "bg-blue-200 self-start"
                : "bg-green-200 self-end"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <Link to="/" className="absolute top-6 left-6">
        <img
          src="/assets/chat-room-logo.png"
          alt="logo"
          className="w-36 sm:w-48"
        />
      </Link>

      <div className="bg-white/98 p-8 rounded-xl shadow-lg w-full max-w-md text-center z-50 hover:scale-105 transition duration-500">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            className="mt-4"
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            className="mt-4"
            value={data.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <span>Login</span>
                <img
                  src="/assets/loading-unscreen.gif"
                  alt=""
                  width={20}
                  className=""
                />
              </div>
            ) : (
              <div>Login</div>
            )}
          </Button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
