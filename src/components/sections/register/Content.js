import React, { useState } from 'react';
import { Link, Redirect} from 'react-router-dom';
import Select2 from 'react-select2-wrapper';
import { userTypeDrop } from '../../../data/select.json';
import Axios from 'axios';
import Slider from 'react-slick';
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    // const [userType, setUserType] = useState("");
    const [tandcBox, setTandcBox] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [mobileNumberError, setMobileNumberError] = useState("");
    // const [userTypeError, setUserTypeError] = useState("");
    const [tandcBoxError, setTandcBoxError] = useState("");

    const [regStatus, setRegStatus] = useState("");

    
    const isValid = () => {
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
        if(name === '' && !emailValidator && password === '' && mobileNumber === '' && tandcBox === ''){
            setNameError("Name feild should not be empty!");
            setEmailError("Please enter a valid email address!");
            setPasswordError("Password feild should not be empty!");
            setMobileNumberError("Mobile Number feild should not be empty!");
            setTandcBoxError("You must accept T&C in order to use Neprealestate!");
        }else if(name === ''){
            setNameError("Name feild should not be empty!");
        }else if(!emailValidator){
            setEmailError("Please enter a valid email address!");
        }else if(password === ''){
            setPasswordError("Password feild should not be empty!");
        }else if(mobileNumber === ''){
            setMobileNumberError("Mobile Number feild should not be empty!");
        }
        // else if(userType === ''){
        //     setUserTypeError("User Type feild should not be empty!");
        // }
        else if(tandcBox === ''){
            setTandcBoxError("You must accept T&C in order to use Neprealestate!");
        }else {
            return true;
        }
    }
    const registerFun = (e) => {
        e.preventDefault();

        setNameError("");
        setEmailError("");
        setPasswordError("");
        setMobileNumberError("");
        // setUserTypeError("");
        setTandcBoxError("");
        setRegStatus("");

        if(isValid()){
            let url = Host + Endpoints.Register;
            Axios.post(url, {
                "name":name,
                "email":email,
                "password":password,
                "mobileNumber":mobileNumber,
                "tandC":tandcBox
            }).then((response) => {
                if(response.data.success === true) {
                    setRegStatus(response.data.message);
                    return <Redirect to="/login" />
                }else{
                    if(response.data.message.code === "ER_DUP_ENTRY"){
                        setRegStatus("This email has been already registered!");
                    }else{
                        setRegStatus("Something went wrong! Please try again!");
                    }
                }
            });
        }
    }
        return (
            <div className="acr-auth-container">
                <div className="acr-auth-content">
                    <form method="post" onSubmit={registerFun}>
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
                        {/* <div className="form-group">
                            <label>User Type</label>
                            <Select2 name="userType" onChange={(e) => setUserType(e.target.value) } data={userTypeDrop} options={{
                                placeholder: 'User Type',
                            }} />
                            <p style={{color:"red", fontSize:"14px"}}>{userTypeError}</p>
                        </div> */}
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" onChange={(e) => setTandcBox(e.target.value)} name="tandcBox"/>

                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the <Link to="/terms-and-conditions"> terms &amp; Conditions </Link> of Property Submission</label>
                            </div>
                            <p style={{color:"red", fontSize:"14px"}}>{tandcBoxError}</p>
                            <p style={{color:"red", fontSize:"14px"}}>{regStatus}</p>
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

export default Content;
