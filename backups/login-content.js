import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

const Content = () =>  {
    constructor(){
        super();
        this.state = {
          email:"",
          password:"",
          emailError:"",
          passwordError:""
        }
      }
      valid(){
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email);
        if(!emailValidator && this.state.password.length < 5){
            this.setState({emailError:"Please enter valid email address!", passwordError:"Password length shoould be more than 5 characters"})
        }
        else if(!emailValidator){
          this.setState({emailError:"Please enter valid email address!"})
        }
        else if(this.state.password.length < 8){
            this.setState({passwordError:"Password should be at least 8 characters!"})
        }else{
          return true;
        }
      }
      submit(){
        this.setState({emailError:"", passwordError:""});
        if(this.valid()){
          alert("Form has been successfully submited!");
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
                            <h3>Log Into Neprealestate</h3>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" onChange={(e) => this.handleChange(e)} className="form-control form-control-light" placeholder="Username" name="email" />
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.emailError}</p>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={(e) => this.handleChange(e)}  className="form-control form-control-light" placeholder="Password" name="password" />
                            <p style={{color:"red", fontSize:"14px"}}>{this.state.passwordError}</p>
                        </div>
                        <div className="form-group">
                            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                        </div>
                        <p className="text-center mb-0">Don't have an account? <Link to="/register">Create One</Link> </p>
                        <button type="button" className="btn-custom secondary btn-block" onClick={() => this.submit()}>Login</button>

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