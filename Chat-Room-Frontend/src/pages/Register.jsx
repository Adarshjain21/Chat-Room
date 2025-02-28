import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

const bubbleVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: [0, 1, 0],
    y: [50, 0, -50],
    transition: {
      duration: 6,
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

const Register = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same");
      return;
    }

    const URL = `${import.meta.env.VITE_API_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        setData({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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

      <div className="absolute top-1/4 left-4 right-4 flex flex-col gap-4">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={index}
            className={`px-4 py-2 rounded-lg shadow-md max-w-xs ${
              msg.sender === "left"
                ? "bg-blue-200 self-start"
                : "bg-green-200 self-end"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              fullWidth
              value={data.firstname}
              onChange={handleChange}
            />
            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={data.lastname}
              onChange={handleChange}
            />
          </div>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            className="mt-4"
            value={data.username}
            onChange={handleChange}
          />
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
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            className="mt-4"
            value={data.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Register
          </Button>
        </form>
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
