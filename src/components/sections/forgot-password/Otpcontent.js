import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Endpoints, Host } from "../../../helper/server";
import { successToast, errorToast } from "../../../helper/Toasthelper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const images = [
  {
    img: "assets/img/coming-soon/1.jpg",
    title: "Quote of the day",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    img: "assets/img/coming-soon/2.jpg",
    title: "Quote of the day",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    img: "assets/img/coming-soon/3.jpg",
    title: "Quote of the day",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  dots: true,
  dotsClass: "d-flex slick-dots",
};
const Otpcontent = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  const isValid = () => {
    if (otp === "" && password === "") {
      setOtpError("Please enter a valid 4 digit OTP");
      setPasswordError("Password should be minimum 8 characters!");
    } else if (otp === "" || otp < 4) {
      setOtpError("Please enter a valid 4 digit OTP");
    } else if (password === "" || password.length < 8) {
      setPasswordError("Password should be minimum 8 characters!");
    } else {
      return true;
    }
  };

  const submit = (e) => {
    e.preventDefault();

    setOtpError("");

    if (isValid()) {
      var url = Host + Endpoints.changePassword;
      var data = {
        otp,
        password,
      };
      Axios.post(url, data).then((response) => {
        if (response.data.error === true) {
          errorToast(response.data.title);
          setTimeout(function () {
            console.log(response.data.title);
          }, 3000);
        } else {
          successToast(response.data.title);
          setTimeout(function () {
            history.push("/login");
          }, 1000);
          localStorage.setItem("token", JSON.stringify(response.data));
        }
      });
    }
  };

  return (
    <div className="acr-auth-container">
      <div className="acr-auth-content">
        <form method="post" onSubmit={submit}>
          <div className="auth-text">
            <h3>Enter OTP & Password</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </p>
          </div>
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              className="form-control form-control-light"
              placeholder="Enter OTP"
              name="otp"
            />
            <p style={{ color: "red", fontSize: "14px" }}>{otpError}</p>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control form-control-light"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New password"
              name="password"
            />
            <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
          </div>
          <div className="form-group">
            <Link to="/login" className="forgot-password">
              Back to login
            </Link>
          </div>

          <p className="text-center mb-0">
            Don't have an account? <Link to="/register">Create One</Link>{" "}
          </p>
          <button type="submit" className="btn-custom secondary btn-block">
            Change Password
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className="acr-auth-bg">
        <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
          {images.map((item, i) => (
            <div key={i}>
              <div
                className="acr-cs-bg-item bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(" + process.env.PUBLIC_URL + "/" + item.img + ")",
                }}
              >
                <div className="acr-auth-quote">
                  <h6>{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Otpcontent;
