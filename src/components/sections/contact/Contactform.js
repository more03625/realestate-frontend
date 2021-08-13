import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast, Endpoints, Host } from "../../../helper/comman_helper";
import Axios from "axios";

const Contactform = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const isValid = () => {
    var emailValidator = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);

    if (
      !emailValidator &&
      fullName === "" &&
      phoneNumber === "" &&
      email === "" &&
      message === ""
    ) {
      setFullNameError("Name feild is required!");
      setPhoneNumberError("Phone Number is required!");
      setEmailError("Please enter a valid email address!");
      setMessageError("Message is required!");
    } else if (phoneNumber === "" || phoneNumber.length < 10) {
      setPhoneNumberError("Please enter a valid 10 digit number!");
    } else if (!emailValidator || email === "") {
      setEmailError("Please enter a valid email address!");
    } else if (message === "") {
      setMessageError("Message is required!");
    } else {
      return true;
    }
  };
  const submitContactForm = (e) => {
    setLoadingButton(true);
    e.preventDefault();
    setFullNameError("");
    setPhoneNumberError("");
    setEmailError("");
    setMessageError("");
    if (isValid()) {
      var url = Host + Endpoints.contactUs;
      var data = {
        email: email,
        subject: "Test sub",
        name: fullName,
        number: phoneNumber,
        message: message,
      };
      Axios.post(url, data).then((response) => {
        setLoadingButton(false);

        if (response.data.error === true) {
          errorToast(response.data.error);
        } else {
          successToast(response.data.title);
        }
      }).catch(() => {

        setLoadingButton(false);

      })
    } else {
      setLoadingButton(false);

    }
  };
  return (
    <div className="section pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-lg-30">
            <div
              className="acr-locations bg-bottom bg-norepeat"
              style={{
                backgroundImage:
                  "url(" +
                  process.env.PUBLIC_URL +
                  "/assets/img/misc/bldg.png)",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/img/contact.jpg"}
                alt=""
              />

              <div className="row">
                <div className="col-sm-6">
                  <div className="acr-location">
                    <h5>New York</h5>
                    <h5>USA</h5>
                    <div className="acr-location-address">
                      <p>Cecilia Chapman 711-2880 Nulla St.</p>
                      <Link to="tel:+123456789">(478) 339 120</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="acr-location">
                    <h5>Tbilsi</h5>
                    <h5>Georgia</h5>
                    <div className="acr-location-address">
                      <p>Aaron Hawkins 5587 Nunc. Avenue</p>
                      <Link to="tel:+123456789">(134) 984 438</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="acr-location">
                    <h5>Moscow</h5>
                    <h5>Russia</h5>
                    <div className="acr-location-address">
                      <p>Lawrence Moreno 935-9940 Tortor. Street</p>
                      <Link to="tel:+123456789">(443) 893 109</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="acr-location">
                    <h5>Cairo</h5>
                    <h5>Egypt</h5>
                    <div className="acr-location-address">
                      <p>Aaron Hawkins 5587 Nunc. Avenue</p>
                      <Link to="tel:+123456789">(009) 338 148</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-title-wrap section-header">
              <h5 className="custom-primary">Contact Us</h5>
              <h2 className="title">Got Any Questions?</h2>
            </div>
            <div className="comment-form">
              <form onSubmit={submitContactForm}>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="fname"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <p style={{ fontSize: "14", color: "red" }}>
                      {fullNameError}
                    </p>
                  </div>
                  <div className="col-md-12 form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p style={{ fontSize: "14", color: "red" }}>
                      {phoneNumberError}
                    </p>
                  </div>
                  <div className="col-md-12 form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p style={{ fontSize: "14", color: "red" }}>{emailError}</p>
                  </div>
                  <div className="col-md-12 form-group">
                    <label>Your Message</label>
                    <textarea
                      className="form-control"
                      placeholder="Type your message..."
                      name="comment"
                      rows={7}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <p style={{ fontSize: "14", color: "red" }}>
                      {messageError}
                    </p>
                  </div>
                </div>
                <button type="submit" className="btn-custom primary" disabled={loadingButton}>
                  Send Message
                  {loadingButton === true ?
                    <div className="ml-1 spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div> : ''
                  }
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactform;
