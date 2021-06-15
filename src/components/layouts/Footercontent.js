import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';

class Footercontent extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 footer-widget">
                            <div className="footer-logo" style={{width:250}}>
                                <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="acres" />
                            </div>
                            <p>RAHUL Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                            <ul className="social-media">
                                <li> <Link to="#"> <i className="fab fa-facebook-f" /> </Link> </li>
                                <li> <Link to="#"> <i className="fab fa-twitter" /> </Link> </li>
                                <li> <Link to="#"> <i className="fab fa-pinterest-p" /> </Link> </li>
                                <li> <Link to="#"> <i className="fab fa-linkedin-in" /> </Link> </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 offset-md-1 col-md-4 col-sm-6 footer-widget">
                            <h5 className="widget-title">Menu</h5>
                            <ul>
                                <li> <Link to="/">Find Home</Link> </li>
                                <li> <Link to="/submit-listing">Add Listing</Link> </li>
                                <li> <Link to="/rent">Listings</Link> </li>
                                <li> <Link to="/news">News</Link> </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6 footer-widget">
                            <h5 className="widget-title">Legal</h5>
                            <ul>
                                <li> <Link to="/privacy-policy">Privacy Policy</Link> </li>
                                <li> <Link to="/terms-and-conditions">Terms & conditions</Link> </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 footer-widget">
                            <h5 className="widget-title">Contact us</h5>
                            <ul>
                                <li> <Link to="#">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Link> </li>
                                <li> <Link to="#"><i className="fas fa-phone"></i> 5962325620</Link> </li>
                                <li> <Link to="#"><i className="fi-rr-envelope"></i> info@neprealestate.com</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="m-0">© Copyright 2020 - <Link to="/">Neprealestate</Link> All Rights Reserved.</p>
                            </div>
                            <div className="col-lg-5">
                                <ul>
                                    <li> <Link to={{pathname: "https://worldindia.com"}} target="_blank">Desgined & Developed by Dotcom Services India Pvt. Ltd.</Link> </li>
                             
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Footercontent;