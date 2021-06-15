import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Select2 from 'react-select2-wrapper';
import { userType } from '../../../data/select.json';
const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

class Content extends Component {
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            dots: true,
            dotsClass: "d-flex slick-dots",
        }
        return (
            <div className="acr-auth-container">
                <div className="acr-auth-content">
                    <form>
                        <div className="auth-text">
                            <h3>Create An Acres Account</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control form-control-light" placeholder="Username" name="username" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control form-control-light" placeholder="Email Address" name="email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control form-control-light" placeholder="Password" name="password" />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="number" className="form-control form-control-light" placeholder="Enter your mobile number" name="password" />
                        </div>
                        <div className="form-group">
                        <label>User Type</label>
                        <Select2 data={userType} options={{
                            placeholder: 'User Type',
                        }} />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" />
                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the <Link to="/terms-and-conditions"> terms &amp; Conditions </Link> of Property Submission</label>
                            </div>
                        </div>
                        <button type="submit" className="btn-custom secondary btn-block">Register</button>
                        <p className="text-center mb-0">Already have an account? <Link to="/login">Login</Link> </p>
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
}

export default Content;