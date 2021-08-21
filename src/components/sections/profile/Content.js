import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast, Endpoints, Host, getUserToken } from "../../../helper/comman_helper";

const Content = ({ userData, handleCallBack, runUseEffect, profileImage, setProfileImage, setIsImageChanged, isImageChanged }) => {

  const successStyle = {
    color: '#28a745',
    fontSize: '14px',
  };

  const [fullName, setFullName] = useState(
    getUserToken().data.name !== null ? getUserToken().data.name : ""
  );
  const [email, setEmail] = useState(
    getUserToken().data.email !== null ? getUserToken().data.email : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    getUserToken().data.mobile !== null ? getUserToken().data.mobile : ""
  );
  const [aboutMe, setAboutMe] = useState(
    getUserToken().data.about_me !== null ? getUserToken().data.about_me : ""
  );

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
  const [profileImageMessage, setProfileImageMessage] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const [cpLoadingButton, setCpLoadingButton] = useState(false); // cp = change password
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
    setCpLoadingButton(true)
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
            token: `${getUserToken().token}`,
          },
        }
      ).then((response) => {
        setCpLoadingButton(false)
        if (response.data.error === true) {
          errorToast(response.data.title);
          setChangePasswordStatus([false, response.data.title]);
        } else {
          successToast(response.data.title);
          setChangePasswordStatus([true, response.data.title]);
        }
      }).catch(() => {
        setLoadingButton(false);
      })
    } else {
      setCpLoadingButton(false)

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
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setProfileImageMessage(`${file.name} has been selected!`);
    const base64Image = await convertToBase64(file);
    handleCallBack(!runUseEffect);
    setIsImageChanged(!isImageChanged)
    setProfileImage(base64Image);

  }
  function updateProfile(event) {
    setLoadingButton(true);
    event.preventDefault();

    setEmailError("");
    setPhoneNumberError("");
    setAboutMeError("");

    if (isValid()) {
      let url = Host + Endpoints.updateProfile;

      const fd = {
        name: fullName, //key & value pair (Object) mkbhd
        mobile: phoneNumber,
        about_me: aboutMe,
        photo: profileImage,
      };

      Axios.post(url, fd, {
        headers: {
          token: `${getUserToken().token}`,
        },
      }).then((response) => {
        setLoadingButton(false);
        if (response.data.error === true) {
          errorToast(response.data.title);
        } else {
          handleCallBack(!runUseEffect);
          successToast(response.data.title);
        }
      }).catch(() => {

        setLoadingButton(false);

      })
    } else {
      setLoadingButton(false);
    }
  }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      }

      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  // useEffect(() => {

  // }, []);
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
              <h3>Welcome Back, {userData && userData.name ? userData.name : ''}</h3>

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
                    defaultValue={userData && userData.name ? userData.name : ''}
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
                    readOnly
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={userData && userData.email ? userData.email : ''}
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
                    defaultValue={userData && userData.mobile ? userData.mobile : ''}
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
                    defaultValue={userData && userData.about_me ? userData.about_me : ''}
                  />
                  <p style={{ color: "red", fontSize: "14px" }}>
                    {aboutMeError}
                  </p>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Profile Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="propertyThumbnail"
                      name="img"
                      onChange={(e) => uploadImage(e)}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="propertyThumbnail"
                    >
                      Choose file
                    </label>
                  </div>
                  <p style={successStyle}>{profileImageMessage}</p>
                </div>
              </div>
              <button type="submit" name="submit" className="btn-custom" disabled={loadingButton}>
                Save Changes

                {loadingButton === true ?
                  <div className="ml-1 spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div> : ''
                }
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
              <button type="submit" className="btn-custom" disabled={cpLoadingButton}>
                Save Changes
                {cpLoadingButton === true ?
                  <div className="ml-1 spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div> : ''
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
