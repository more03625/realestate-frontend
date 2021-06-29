import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select2 from 'react-select2-wrapper';

const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

const Content = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [userType, setUserType] = useState("");
    const [tandcBox, setTandcBox] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [mobileNumberError, setMobileNumberError] = useState("");
    const [userTypeError, setUserTypeError] = useState("");
    const [tandcBoxError, setTandcBoxError] = useState("");

    const isValid = () => {
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
        if(name === ''){
            setNameError("Name feild should not be empty!");
        }
        if(!emailValidator){
            setEmailError("Please enter a valid email address!");
        }
        if(password === ''){
            setPasswordError("Password feild should not be empty!");
        }
        if(mobileNumber === ''){
            setMobileNumberError("Mobile Number feild should not be empty!");
        }
        if(userType === ''){
            setUserTypeError("User Type feild should not be empty!");
        }
        if(tandcBox === ''){
            setTandcBoxError("You must accept T&C in order to use Neprealestate!");
        }
    }
    const submit = () => {
        alert("Please confirm your email!");
        // if(isValid()){
        //     alert("Please confirm your email!");
        // }
    }
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
                    <form method="post" onSubmit={submit}>
                        <div className="auth-text">
                            <h3>Create An Acres Account</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control form-control-light" onChange={(e) => setName(e.target.value)} placeholder="Username" name="name" />
                            <p style={{color:"red", fontSize:"14px"}}>{nameError}</p>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control form-control-light" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" name="email" />
                            <p style={{color:"red", fontSize:"14px"}}>{emailError}</p>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control form-control-light" onChange={ (e) => setPassword(e.target.value)} placeholder="Password" name="password" autoComplete="off"/>
                            <p style={{color:"red", fontSize:"14px"}}>{passwordError}</p>
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="number" className="form-control form-control-light" onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter your mobile number" name="mobileNumber" />
                            <p style={{color:"red", fontSize:"14px"}}>{mobileNumberError}</p>
                        </div>
                        <div className="form-group">
                            <label>User Type</label>
                            <Select2 name="userType" onChange={(e) => setUserType(e.target.value) } data={userType} options={{
                                placeholder: 'User Type',
                            }} />
                            <p style={{color:"red", fontSize:"14px"}}>{userTypeError}</p>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" onChange={(e) => setTandcBox(e.target.value)} name="tandcBox"/>

                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the <Link to="/terms-and-conditions"> terms &amp; Conditions </Link> of Property Submission</label>
                            </div>
                            <p style={{color:"red", fontSize:"14px"}}>{tandcBoxError}</p>
                        </div>
                        <button type="submit" className="btn-custom secondary btn-block">Register</button>
                        <p className="text-center mb-0">Already have an account? <Link to="/login">Login</Link> </p>
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
