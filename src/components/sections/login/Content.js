import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Slider from "react-slick";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast, Endpoints, Host } from "../../../helper/comman_helper";
import ReCaptchaV2 from "react-google-recaptcha";
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
const Content = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [loginButtonStatus, setLoginButtonStatus] = useState(false);

  const isValid = () => {
    var emailValidator = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);
    if (!emailValidator && password === "" && token === null && token.length === 0) {
      setEmailError("Please enter a valid email address!");
      setPasswordError("Please enter your password!");
      setTokenError("Please Verify captcha!");
    } else if (!emailValidator) {
      setEmailError("Please enter a valid email address!");
    } else if (password === "") {
      setPasswordError("Please enter your password!");
    } else if (token === null || token.length === 0) {
      setTokenError("Please Verify captcha!");
    } else {
      return true;
    }
  };
  //Rahul more

  const login = (e) => {
    setLoginButtonStatus(true);
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (isValid()) {
      let url = Host + Endpoints.Login;
      var data = {
        email: email,
        password: password,
        token: token,
        type: "seller",
      }
      // , {
      //   headers: {
      //     "Access-Control-Allow-Origin": "http://localhost:3000/"
      //   }
      // }
      Axios.post(url, data).then((response) => {
        setLoginButtonStatus(false);

        if (response.data.error === true) {
          errorToast(response.data.title);

          setTimeout(function () {
            setLoginStatus(response.data.title);
          }, 3000);
        } else {
          successToast();
          setTimeout(function () {
            setLoginStatus(true);
          }, 1000);
          localStorage.setItem("token", JSON.stringify(response.data));
        }
      });
    } else {
      console.log("In else")
      setLoginButtonStatus(false);

    }
  };

  const handleToken = (captchaToken) => {
    setToken(captchaToken);
  };
  const handleExpire = () => {
    setToken(null);
  };
  return (
    <div className="acr-auth-container">
      {loginStatus === true && <Redirect to="/home" />}
      <div className="acr-auth-content">
        <form method="post" onSubmit={login}>
          <div className="auth-text">
            <h3>
              Log Into <span style={{ color: "#004592" }}>Nep </span>
              <span style={{ color: "#F42F2F" }}>Real Estate</span>
            </h3>
          </div>
          <div className="form-group">
            <label className="required">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-light"
              placeholder="Enter your email"
              name="email"
            />

            <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>
          </div>
          <div className="form-group">
            <label className="required">Password </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-light"
              placeholder="Password"
              name="password"
            />
            <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
          </div>
          <div className="form-group">
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <ReCaptchaV2
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleToken}
            onExpire={handleExpire}
          />

          <p style={{ color: "red", fontSize: "14px" }}>{tokenError}</p>
          <p className="text-center mb-0">
            Don't have an account? <Link to="/register">Create One</Link>{" "}
          </p>
          <button
            type="submit"
            className="btn-custom secondary btn-block"
            disabled={loginButtonStatus}
          >
            Login
            {loginButtonStatus === true ?
              <div className="ml-1 spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div> : ''
            }
          </button>
          <ToastContainer />
        </form>
      </div>
      <div className="acr-auth-bg">
        <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
          {images.map((item, i) => (
            <div key={i}>
              <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} >
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

export default Content;
