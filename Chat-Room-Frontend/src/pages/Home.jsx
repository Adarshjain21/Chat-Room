import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AfterLogin from "../components/AfterLogin";
import BeforeLogin from "../components/BeforeLogin";

const Home = () => {
  const user = useSelector((state) => state.user);

  return <>{user?._id ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Home;
