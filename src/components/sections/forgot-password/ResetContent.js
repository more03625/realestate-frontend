import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Slider from "react-slick";
import { successToast, Endpoints, Host, errorToast } from "../../../helper/comman_helper";
import { ToastContainer } from "react-toastify";
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
const ResetContent = () => {
  const { remember_token } = useParams();
  const [confirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassError, setconfirmPassError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();
  const isValid = () => {
    if (confirmPass === "" && password === "") {
      setconfirmPassError("Password should be minimum 8 characters!");
      setPasswordError("Password should be minimum 8 characters!");
    } else if (confirmPass === "" || confirmPass < 8) {
      setconfirmPassError("Password should be minimum 8 characters!");
    } else if (password === "" || password.length < 8) {
      setPasswordError("Password should be minimum 8 characters!");
    } else if (password !== confirmPass) {
      setconfirmPassError("Password and confirm password should be same!");
    } else {
      return true;
    }
  };

  const submit = (e) => {
    e.preventDefault();

    setconfirmPassError("");

    if (isValid()) {
      var url = Host + Endpoints.ResetPassword;
      var data = {
        remember_token,
        password,
      };
      Axios.post(url, data).then((response) => {
        if (response.data.error === true) {
          errorToast(response.data.title);
        } else {
          successToast(response.data.title);
          setTimeout(function () {
            history.push("/login");
          }, 1000);
        }
      });
    }
  };

  return (
    <div className="acr-auth-container">
      <div className="acr-auth-content">
        <form method="post" onSubmit={submit}>
          <div className="auth-text">
            <h3>Enter Your New Password</h3>
            {/* <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </p> */}
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
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={(e) => setConfirmPass(e.target.value)}
              className="form-control form-control-light"
              placeholder="Enter Confirm password"
              name="confirm_password"
            />
            <p style={{ color: "red", fontSize: "14px" }}>{confirmPassError}</p>
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

export default ResetContent;
