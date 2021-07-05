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
const Content = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;

    const isValid = () => {
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);

        if (!emailValidator && password === '') {
            setEmailError("Please enter a valid email address!");
            setPasswordError("Please enter your password!");
        } else if (!emailValidator) {
            setEmailError("Please enter a valid email address!");
        } else if (password === "") {
            setPasswordError("Please enter your password!");
        } else {
            return true;
        }
    }

    const login = (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        if (isValid()) {
            let url = Host + Endpoints.Login;

            Axios.post(url, {
                "email": email,
                "password": password,
                "type": "seller"
            }).then((response) => {
                if (response.data.error === true) {
                    setLoginStatus(response.data.title);
                } else {
                    localStorage.setItem("token", JSON.stringify(response.data));
                    setLoginStatus(true);
                }
            });
        }
    }

    return (
        <div className="acr-auth-container">
            {loginStatus === true &&
                <Redirect to="/home" />
            }
            <div className="acr-auth-content">
                <form method="post" onSubmit={login}>
                    <div className="auth-text">
                        <h3>Log Into <span style={{ color: '#004592' }}>Nep </span><span style={{ color: '#F42F2F' }}>Real Estate</span></h3>

                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control form-control-light" placeholder="Username" name="email" />
                        <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control form-control-light" placeholder="Password" name="password" />
                        <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
                    </div>
                    <div className="form-group">
                        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <p className="text-center mb-0" style={{ color: 'red' }}>{loginStatus}</p>
                    <p className="text-center mb-0">Don't have an account? <Link to="/register">Create One</Link> </p>
                    <button type="submit" className="btn-custom secondary btn-block">Login</button>
                </form>
            </div>
            <div className="acr-auth-bg">
                {/* <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
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
                    </Slider> */}
            </div>
        </div>
    );
}

export default Content;