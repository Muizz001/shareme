import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);
    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, sub, picture } = decoded;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          autoPlay
          muted
          controls={false}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
