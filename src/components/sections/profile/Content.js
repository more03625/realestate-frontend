import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast, Endpoints, Host } from "../../../helper/comman_helper";

const Content = () => {
  const userInfo = JSON.parse(localStorage.getItem("token")); // get this details from db

  const [fullName, setFullName] = useState(
    userInfo.data.name !== null ? userInfo.data.name : ""
  );
  const [email, setEmail] = useState(
    userInfo.data.email !== null ? userInfo.data.email : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo.data.mobile !== null ? userInfo.data.mobile : ""
  );
  const [aboutMe, setAboutMe] = useState(
    userInfo.data.about_me !== null ? userInfo.data.about_me : ""
  );
  const [profileImage, setProfileImage] = useState("");
  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [aboutMeError, setAboutMeError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const [newPasswordError, setNewPasswordError] = useState("");
  const [newConfirmPasswordError, setNewConfirmPasswordError] = useState("");
  const [changePasswordStatus, setChangePasswordStatus] = useState([
    false,
    null,
  ]);

  const isValidChangePassword = () => {
    if (newPassword === "" && newConfirmPassword === "") {
      setNewPasswordError("Password should be minimum 8 characters");
      setNewConfirmPasswordError("Please enter confirm password");
    } else if (newPassword === "" || newPassword.length < 8) {
      setNewPasswordError("Password should be minimum 8 characters");
    } else if (newConfirmPassword === "" || newConfirmPassword.length < 8) {
      setNewConfirmPasswordError("Password should be minimum 8 characters");
    } else if (newPassword !== newConfirmPassword) {
      setNewPasswordError("Both passwords must match");
    } else {
      return true;
    }
  };

  function changePassword(e) {
    e.preventDefault();

    setNewPasswordError("");
    setNewConfirmPasswordError("");

    if (isValidChangePassword()) {
      var url = Host + Endpoints.changePassword;
      Axios.post(
        url,
        {
          password: newConfirmPassword,
        },
        {
          headers: {
            token: `${userInfo.token}`,
          },
        }
      ).then((response) => {
        if (response.data.error === true) {
          errorToast(response.data.title);
          setChangePasswordStatus([false, response.data.title]);
        } else {
          successToast(response.data.title);
          setChangePasswordStatus([true, response.data.title]);
        }
      });
    }
  }
  const isValid = () => {
    var emailValidator = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);
    if (
      !emailValidator &&
      fullName === "" &&
      email === "" &&
      phoneNumber === "" &&
      aboutMe === ""
    ) {
      setFullNameError("Full name is required!");
      setEmailError("Please enter a valid email address!");
      setPhoneNumberError("Phone number is required!");
      setAboutMeError("About me is required!");
    } else if (!emailValidator) {
      setEmailError("Please enter a valid email address!");
    } else if (fullName === "") {
      setFullNameError("Full name is required!");
    } else if (email === "") {
      setEmailError("Please enter a valid email address!");
    } else if (phoneNumber === "") {
      setPhoneNumberError("Phone number is required!");
    } else if (aboutMe === "") {
      setAboutMeError("About me is required!");
    } else {
      return true;
    }
  };

  function updateProfile(event) {
    event.preventDefault();

    setEmailError("");
    setPhoneNumberError("");
    setAboutMeError("");

    if (isValid()) {
      let url = Host + Endpoints.updateProfile;
      let reader = new FileReader();

      if (profileImage !== "") {
        reader.readAsDataURL(profileImage[0]);
        reader.onload = (e) => {
          var userImage = e.target.result;
          const fd = {
            name: fullName, //key & value pair (Object) mkbhd
            mobile: phoneNumber,
            about_me: aboutMe,
            photo: userImage,
          };
          Axios.post(url, fd, {
            headers: {
              token: `${userInfo.token}`,
            },
          }).then((response) => {
            if (response.data.error === true) {
              errorToast(response.data.title);
            } else {
              successToast(response.data.title);
            }
          });
        };
      } else {
        alert("Upload Image!");
      }
    }
  }
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="sidebar sticky-sidebar user-nav sidebar-left">
              <ul>
                <li>
                  {" "}
                  <Link className="active" to="/profile">
                    {" "}
                    Edit Profile
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/my-listings">My Listings</Link>{" "}
                </li>
                {/*
                <li>
                  {" "}
                  <Link to="/profile-saved-listings">Saved Listings</Link>{" "}
                </li>
                */}
                <li>
                  {" "}
                  <Link className="logout" to="/logout">
                    <i className="flaticon-shut-down-button" /> Logout
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="acr-welcome-message">
              <h3>Welcome Back, Randy Blue</h3>

            </div>
            <form id="profileForm" onSubmit={updateProfile}>
              <div className="row">
                <div className="col-lg-6 form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Your Name"
                    onChange={(e) => setFullName(e.target.value)}
                    defaultValue={userInfo.data.name}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {fullNameError}
                  </p>
                </div>

                <div className="col-lg-6 form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={userInfo.data.email}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>
                </div>
                <div className="col-lg-6 form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="+123 456 789"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    defaultValue={userInfo.data.mobile}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {phoneNumberError}
                  </p>
                </div>

                <div className="col-lg-12 form-group">
                  <label>About Me</label>
                  <textarea
                    name="about"
                    rows={4}
                    className="form-control"
                    placeholder="About Me"
                    onChange={(e) => setAboutMe(e.target.value)}
                    defaultValue={userInfo.data.about_me}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {aboutMeError}
                  </p>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Upload Your ID</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="propertyThumbnail"
                      name="img"
                      onChange={(e) => setProfileImage(e.target.files)}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="propertyThumbnail"
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" name="submit" className="btn-custom">
                Save Changes
              </button>
              <span className="ml-3">{updateProfileStatus}</span>
              <ToastContainer />
            </form>
            <hr />
            <div className="acr-welcome-message">
              <h3>Change Password</h3>

            </div>
            <form onSubmit={changePassword}>
              <div className="row">
                <div className="col-lg-6 form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {newPasswordError}
                  </p>
                </div>
                <div className="col-lg-6 form-group">
                  <label>Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="repeatpassword"
                    placeholder="Repeat Password"
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {newConfirmPasswordError}
                  </p>
                </div>
                {/* <div className="col-lg-12 form-group">
                                        <label>Upload Your ID</label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="propertyThumbnail" />
                                            <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                        </div>
                                    </div> */}
              </div>
              <button type="submit" className="btn-custom">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
