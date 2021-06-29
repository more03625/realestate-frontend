import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Endpoints, Host } from '../../../helper/server';

const Content = () => {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressOne, setAddressOne] = useState("");
    const [addressTwo, setAddressTwo] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const [fullNameError, setFullNameError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [addressOneError, setAddressOneError] = useState("");
    const [addressTwoError, setAddressTwoError] = useState("");
    const [aboutMeError, setAboutMeError] = useState("");

        const isValid = () => {
            var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
             if(!emailValidator && fullName === '' && userName === '' && email === '' && phoneNumber === '' && addressOne === '' && addressTwo === '' && aboutMe === ''){
                setFullNameError("Full name is required!");
                setUserNameError("Username is required!");
                setEmailError("Please enter a valid email address!");
                setPhoneNumberError("Phone number is required!");
                setAddressOneError("Address one is required!");
                setAddressTwoError("Address 2 is required!");
                setAboutMeError("About me is required!");
            }else if(!emailValidator){
                setEmailError("Please enter a valid email address!");
            }else if(fullName === ''){
                setFullNameError("Full name is required!");
            }else if (userName === ''){
                setUserNameError("Username is required!");
            }else if(email === ''){
                setEmailError("Please enter a valid email address!");
            }else if(phoneNumber === ''){
                setPhoneNumberError("Phone number is required!");
            }else if(addressOne === ''){
                setAddressOneError("Address one is required!");
            }else if(addressTwo === ''){
                setAddressTwoError("Address 2 is required!");
            }else if(aboutMe === ''){
                setAboutMeError("About me is required!");
            }else{
                return true;
            }
        }
        function updateProfile(event){
            event.preventDefault();

                setFullNameError("");
                setUserNameError("");
                setEmailError("");
                setPhoneNumberError("");
                setAddressOneError("");
                setAddressTwoError("");
                setAboutMeError("");

            if(isValid()){
                let url = Host + Endpoints.updateProfile;
                var token = localStorage.getItem("token");
           
                const data = {
                    "fullName":fullName, //key & value pair (Object)
                    "userName":userName,
                    "email":email,
                    "phoneNumber":phoneNumber,
                    "addressOne":addressOne,
                    "addressTwo":addressTwo,
                    "aboutMe":aboutMe
                }
                Axios.post(url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Accept' : 'application/json',
                        // 'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log(response);
                });
            }
        }
        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="sidebar sticky-sidebar user-nav sidebar-left">
                                <ul>
                                    <li> <Link className="active" to="/profile"> Edit Profile</Link> </li>
                                    <li> <Link to="/profile-listings">My Listings</Link> </li>
                                    <li> <Link to="/profile-saved-listings">Saved Listings</Link> </li>
                                    <li> <Link className="logout" to="/"><i className="flaticon-shut-down-button" /> Logout</Link> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="acr-welcome-message">
                                <h3>Welcome Back, Randy Blue</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            </div>
                            <form onSubmit={updateProfile}>
                                <div className="row">
                                    <div className="col-lg-6 form-group">
                                        <label>Full Name</label>
                                        <input type="text" className="form-control" placeholder="Your Name" onChange={(e) => setFullName(e.target.value)}/>
                                        <p style={{color:"red", fontSize:"14px"}}>{fullNameError}</p>
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Your username" onChange={(e) => setUserName(e.target.value)}/>
                                        <p style={{color:"red", fontSize:"14px"}}>{userNameError}</p>
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Your email" onChange={(e) => setEmail(e.target.value)}/>
                                        <p style={{color:"red", fontSize:"14px"}}>{emailError}</p>
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" placeholder="+123 456 789" onChange={(e) => setPhoneNumber(e.target.value)} />
                                        <p style={{color:"red", fontSize:"14px"}}>{phoneNumberError}</p>
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Address One</label>
                                        <input type="text" className="form-control" placeholder="Address" onChange={(e) => setAddressOne(e.target.value)}/>
                                        <p style={{color:"red", fontSize:"14px"}}>{addressOneError}</p>
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Address Two</label>
                                        <input type="text" className="form-control" placeholder="Address" onChange={(e) => setAddressTwo(e.target.value)}/>
                                        <p style={{color:"red", fontSize:"14px"}}>{addressTwoError}</p>
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label>About Me</label>
                                        <textarea name="about" rows={4} className="form-control" placeholder="About Me" onChange={(e) => setAboutMe(e.target.value)}/>
                                        <p style={{color:"red", fontSize:"14px"}}>{aboutMeError}</p>
                                    </div>
                                </div>
                                <button type="submit" name="submit" className="btn-custom">Save Changes</button>
                            </form>
                            <hr />
                            <div className="acr-welcome-message">
                                <h3>Security</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="col-lg-6 form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Repeat Password</label>
                                        <input type="password" className="form-control" placeholder="Repeat Password" />
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label>Upload Your ID</label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="propertyThumbnail" />
                                            <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-custom">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Content;