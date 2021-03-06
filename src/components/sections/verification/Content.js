import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Endpoints, Host, successToast, errorToast } from "../../../helper/comman_helper";

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
const Content = ({ userData }) => {
  {
    /*Use KEY from previous from Component*/
  }
  const history = useHistory();

  const [emailOTP, setEmailOTP] = useState("");

  const [emailOTPError, setEmailOTPError] = useState("");
  const [phoneOTPError, setPhoneOTPError] = useState("");

  const [otpStatus, setOtpStatus] = useState(false);

  const isValid = () => {
    if (emailOTP === "") {
      setEmailOTPError("Please enter a valid email OTP!");
      // setPhoneOTPError("Please enter a valid Phone OTP!");
    }
    else if (emailOTP.length < 4 || emailOTP === "") {
      setEmailOTPError("Please enter valid email OTP of 4 digit.");
    }
    // else if (phoneOTP.length < 4 || phoneOTP === "") {
    //   setPhoneOTPError("Please enter valid phone OTP of 4 digit.");
    // }
    else {
      return true;
    }
  };
  const [loadingButton, setLoadingButton] = useState(false);
  const [resendLoadingButton, setResendLoadingButton] = useState(false);
  const ValidateOpt = (e) => {
    setLoadingButton(true);
    e.preventDefault();

    setEmailOTPError("");
    setPhoneOTPError("");

    if (isValid()) {
      let url = Host + Endpoints.verifyOtp;
      Axios.post(url, {
        email: userData.email,
        // sms_otp: phoneOTP,
        email_otp: emailOTP,
        type: "seller",
      }).then((response) => {
        setLoadingButton(false);

        if (response.data.error === true) {
          errorToast(response.data.title);
          setOtpStatus(false);
        } else {
          successToast(response.data.title);

          setTimeout(function () {
            history.push("/login");
          }, 2000);
        }
      }).catch(() => {

        setLoadingButton(false);

      })
    } else {
      setLoadingButton(false)
    }
  };

  const resendOTP = (e) => {
    setResendLoadingButton(true);
    e.preventDefault();
    console.log();
    var url = Host + Endpoints.resendOtp;

    if (e.target.name === "mailOTP") {
      var data = { email: userData.email };
    } else {
      var data = { mobile: userData.mobile };
    }

    Axios.post(url, data).then((response) => {
      setResendLoadingButton(false);

      if (response.data.error === true) {
        errorToast(response.data.title);
      } else {
        successToast(response.data.title);
      }
    }).catch(() => {

      setResendLoadingButton(false);

    })
  };

  return (
    <div className="acr-auth-container">
      <div className="acr-auth-content">
        <form method="post" onSubmit={ValidateOpt}>
          <div className="auth-text">
            <h3>
              <span style={{ color: "#004592" }}>Nep </span>
              <span style={{ color: "#F42F2F" }}>Real Estate</span> Verification
              Area{" "}
            </h3>
          </div>
          <div className="form-group">
            <label>Enter email OTP</label>
            <input
              type="number"
              onChange={(e) => setEmailOTP(e.target.value)}
              className="form-control form-control-light"
              placeholder="Email OTP"
              name="email"
            />
            <p style={{ color: "red", fontSize: "14px" }}>{emailOTPError}</p>
          </div>
          <div className="form-group">
            <Link
              to="#"
              className="forgot-password"
              onClick={resendOTP}
              name="mailOTP"
            >
              Didn't received? mail again
              {resendLoadingButton === true ?
                <div className="ml-1 spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div> : ''
              }
            </Link>
          </div>
          {/*
          <div className="form-group">
            <label>Enter Mobile OTP</label>
            <input
              type="number"
              onChange={(e) => setPhoneOTP(e.target.value)}
              className="form-control form-control-light"
              placeholder="Mobile OTP"
              name="password"
            />
            <p style={{ color: "red", fontSize: "14px" }}>{phoneOTPError}</p>
          </div>
        
          <div className="form-group">
            <Link
              to="#"
              className="forgot-password"
              onClick={resendOTP}
              name="phoneOTP"
            >
              Didn't received? send again
            </Link>
          </div>
*/}
          <ToastContainer />
          <button type="submit" className="btn-custom secondary btn-block" disabled={loadingButton}>
            Submit
            {loadingButton === true ?
              <div className="ml-1 spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div> : ''
            }
          </button>
        </form>
      </div>
      <div className="acr-auth-bg">
        <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
          {images && images.map((item, i) => (
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
