import React from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const BeforeLogin = () => {
  return (
      <div className="py-6 px-6 sm:px-12 h-screen w-full bg-gradient-to-r from-blue-400 via-blue-300 to-stone-200">
        <div className="flex justify-between items-center gap-3">
          <Link to={"/"}>
            <img
              src="./src/assets/chat-room-logo.png"
              alt="logo"
              className="w-36 sm:w-48 "
            />
          </Link>

          <div className="flex justify-center items-center gap-2 sm:gap-4">
            <Link to={"/login"}>
              <div className="px-4 py-2 border border-blue-700 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg hover:scale-110 shadow-lg transition duration-200 flex justify-center items-center gap-1 group">
                <span className="text-[12px] sm:text-[16px]">Login</span>
                <span className="hidden sm:block group-hover:translate-x-2 transition duration-500">
                  <HiArrowLongRight size={20} />
                </span>
              </div>
            </Link>
            <Link to={"register"}>
              <div className="px-4 py-2 border border-blue-700 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold rounded-lg hover:scale-110 shadow-lg transition duration-200 flex justify-center items-center gap-1 group">
                <span className="text-[12px] sm:text-[16px]">Register</span>
                <span className="hidden sm:block group-hover:translate-x-2 transition duration-500">
                  <HiArrowLongRight size={20} />
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-20 flex flex-col-reverse lg:flex-row justify-center items-center gap-4">
          <div className="lg:w-[50%]">
            <h1 className="font-extrabold text-xl md:text-2xl lg:text-4xl mb-2">
              Welcome to Chat Room
            </h1>
            <p className="font-semibold sm:text-xl mb-2">
              Stay connected with friends, family, or colleagues instantly.
            </p>
            <p className="leading-7">
              In today's fast-paced world, staying connected has never been more
              important. Chat Room offers a powerful and intuitive messaging
              platform that allows you to chat effortlessly with friends,
              family, and colleagues anytime, anywhere.
            </p>
          </div>

          <div className="lg:w-[50%]">
            <img
              src="./src/assets/home-hero-image.png"
              alt="Home Banner"
              className="sm:min-w-[350px]"
            />
          </div>
        </div>
      </div>
  )
}

export default BeforeLogin
