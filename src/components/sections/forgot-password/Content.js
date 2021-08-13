import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Endpoints, Host, successToast, errorToast } from "../../../helper/comman_helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [loadingButton, setLoadingButton] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");
  const history = useHistory();

  const isValid = () => {
    var emailValidator = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);

    if (!emailValidator && token && token === null && token.length === 0) {
      setEmailError("Please enter a valid email address!");
      setTokenError('Please verify captcha!')
    } else if (!emailValidator) {
      setEmailError("Please enter a valid email address!");
    } else if (token === null || token.length === 0) {
      setTokenError('Please verify captcha!')
    }
    else {
      return true;
    }
  };


  const submit = (e) => {
    setLoadingButton(true)
    e.preventDefault();

    setEmailError("");
    setTokenError('')

    if (isValid()) {
      var url = Host + Endpoints.forgotPassword;
      axios.post(url, { email: email, type: 'seller', token: token, }).then((response) => {
        setLoadingButton(false)
        if (response.data.error === true) {
          // history.push("/forgot-password-verification");
          errorToast("❌" + response.data.title);
        } else {
          e.target.reset()
          successToast('Check email to create new password!');
        }
      }).catch(() => {

        setLoadingButton(false);

      })
    } else {
      setLoadingButton(false);
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
      <div className="acr-auth-content">
        <form method="post" onSubmit={submit}>
          <div className="auth-text">
            <h3>Forgot Password</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </p>
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


          <ReCaptchaV2
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleToken}
            onExpire={handleExpire}
          />
          <p style={{ color: "red", fontSize: "14px" }}>{tokenError}</p>

          <div className="form-group">
            <Link to="/login" className="forgot-password">
              Back to login
            </Link>
          </div>

          <p className="text-center mb-0">
            Don't have an account? <Link to="/register">Create One</Link>{" "}
          </p>
          <button type="submit" className="btn-custom secondary btn-block" disabled={loadingButton}>
            Send Recovery Email

            {loadingButton === true ?
              <div className="ml-1 spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div> : ''
            }
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

export default Content;
