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
    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            mobileNumber:"",
            userType:"",
            tandcBox:"",

            nameError:"",
            emailError:"",
            passwordError:"",
            mobileNumberError:"",
            userTypeError:"",
            tandcBoxError:""
        }
    }
    valid(){
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email);
        if(this.state.name === ''){
            this.setState({nameError:"Name feild should not be empty!"});
        }
        if(!emailValidator){
            this.setState({emailError:"Please enter a valid email address!"});
        }
        if(this.state.password === ''){
            this.setState({passwordError:"Password feild should not be empty!"});
        }
        if(this.state.mobileNumber === ''){
            this.setState({mobileNumberError:"Mobile Number feild should not be empty!"});
        }
        if(this.state.userType === ''){
            this.setState({userTypeError:"User Type feild should not be empty!"});
        }
        
        
        if(this.state.tandcBox === ''){
            this.setState({tandcBoxError:"You must accept T&C in order to use Neprealestate!"});
        }
    }
    submit(){
        this.setState({nameError:"", emailError:"", passwordError:"", mobileNumberError:"", userTypeError:"", tandcBoxError:""});
        if(this.valid()){
            alert("Please confirm your email!");
        }
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    
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
                    <form method="post">
                        <div className="auth-text">
                            <h3>Create An Acres Account</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control form-control-light" onChange={ (e) => this.handleChange(e) } placeholder="Username" name="name" />
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.nameError}</p>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control form-control-light" onChange={ (e) => this.handleChange(e) } placeholder="Email Address" name="email" />
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.emailError}</p>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control form-control-light" onChange={ (e) => this.handleChange(e) } placeholder="Password" name="password" autoComplete="off"/>
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.passwordError}</p>
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="number" className="form-control form-control-light" onChange={ (e) => this.handleChange(e) } placeholder="Enter your mobile number" name="mobileNumber" />
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.mobileNumberError}</p>
                        </div>
                        {/* <div className="form-group">
                            <label>User Type</label>
                            <Select2 name="userType" onChange={ (e) => this.handleChange(e) } data={userType} options={{
                                placeholder: 'User Type',
                            }} />
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.userTypeError}</p>
                        </div> */}
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" onChange={ (e) => this.handleChange(e) } name="tandcBox"/>
                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the <Link to="/terms-and-conditions"> terms &amp; Conditions </Link> of Property Submission</label>
                            </div>
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.tandcBoxError}</p>
                        </div>
                        <button type="button" className="btn-custom secondary btn-block" onClick={ (e) => this.submit() }>Register</button>
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