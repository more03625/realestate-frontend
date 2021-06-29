import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

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
    const [emailError, setEmailError] = useState("");

        const isValid = () => {
            var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);

            if(!emailValidator){
                setEmailError("Please enter a valid email address!");
            }else{
                return true;
            }
        }

        const submit = (e) => {
            e.preventDefault();

            setEmailError("");

            if(isValid()){
                alert("Your email is: " + email);
            }
        }
        return (
            <div className="acr-auth-container">
                <div className="acr-auth-content">
                    <form method="post" onSubmit={submit}>
                        <div className="auth-text">
                            <h3>Forgot Password</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control form-control-light" placeholder="Enter your email" name="email"/>
                            <p style={{color:"red", fontSize:"14px"}}>{emailError}</p>
                        </div>
                   
                        <div className="form-group">
                            <Link to="/login" className="forgot-password">Back to login</Link>
                        </div>
                        
                        <p className="text-center mb-0">Don't have an account? <Link to="/register">Create One</Link> </p>
                        <button type="submit" className="btn-custom secondary btn-block">Login</button>
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
}

export default Content;