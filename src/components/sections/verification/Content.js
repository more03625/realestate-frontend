import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Slider from 'react-slick';
import Axios from 'axios';
import { Endpoints, Host } from '../../../helper/server';
const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];
const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: true,
    dotsClass: "d-flex slick-dots",
}
const Content = () =>  {
    const [emailOTP, setEmailOTP] = useState("");
    const [phoneOTP, setPhoneOTP] = useState("");

    const [emailOTPError, setEmailOTPError] = useState("");
    const [phoneOTPError, setPhoneOTPError] = useState("");

    const [otpStatus, setOtpStatus] = useState(false);

    Axios.defaults.withCredentials = true;

    const isValid = () => {
        
        if(emailOTP ==='' && phoneOTP ===''){
            setEmailOTPError("Please enter a valid email OTP!");
            setPhoneOTPError("Please enter a valid Phone OTP!");
        }else if(emailOTP.length < 4 || emailOTP === ""){
            setEmailOTPError("Please enter valid email OTP of 4 digit.");
        }else if(phoneOTP.length < 4 || phoneOTP === ""){
            setPhoneOTPError("Please enter valid phone OTP of 4 digit.");
        }else{
            return true;
        }
    }

    const ValidateOpt = (e) => {
        e.preventDefault();

        setEmailOTPError("");
        setPhoneOTPError("");
        
        if(isValid()){
            let url = Host + Endpoints.verifyOtp;
            Axios.post(url, {
                "email":"rahulmore@worldindia.com",
                "sms_otp":emailOTP,
                "email_otp":phoneOTP,
                "type":"seller"
            }).then((response) => {
                console.log(response.data.token);
                if(response.data.error === true){
                    setOtpStatus(false);
                }else{
                    setOtpStatus(true);
                }
            });
        }
    }
    
        return (
            <div className="acr-auth-container">
                {otpStatus === true && 
                    <Redirect to="/login"/>
                }
                <div className="acr-auth-content">
                    <form method="post" onSubmit={ValidateOpt}>
                        <div className="auth-text"> 
                            <h3><span style={{color: '#004592'}}>Nep </span><span style={{color: '#F42F2F'}}>Real Estate</span> Verification Area </h3>
                        </div>
                        <div className="form-group">
                            <label>Enter email OTP</label>
                            <input type="number" onChange={(e) => setEmailOTP(e.target.value)} className="form-control form-control-light" placeholder="Email OTP" name="email" />
                            <p style={{color:"red", fontSize:"14px"}}>{emailOTPError}</p>
                        </div>
                        <div className="form-group">
                            <Link to="#" className="forgot-password">Didn't received? send again</Link>
                        </div>
                        <div className="form-group">
                            <label>Enter Mobile OTP</label>
                            <input type="number" onChange={(e) => setPhoneOTP(e.target.value)}  className="form-control form-control-light" placeholder="Mobile OTP" name="password" />
                            <p style={{color:"red", fontSize:"14px"}}>{phoneOTPError}</p>
                        </div>
                        <div className="form-group">
                            <Link to="#" className="forgot-password">Didn't received? Mail again</Link>
                        </div>
                        <p className="text-center mb-0" style={{color: 'red'}}>{otpStatus}</p>
                    
                        <button type="submit" className="btn-custom secondary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
}

export default Content;