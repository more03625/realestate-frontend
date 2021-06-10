import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Footercontent extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 footer-widget">
                            <div className="footer-logo">
                                <img src={process.env.PUBLIC_URL + "/assets/img/logo-light.png"} alt="acres" />
                                <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="acres" />
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
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
                                <li> <Link to="#">Find Home</Link> </li>
                                <li> <Link to="#">Add Listing</Link> </li>
                                <li> <Link to="#">Listings</Link> </li>
                                <li> <Link to="#">Blog</Link> </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6 footer-widget">
                            <h5 className="widget-title">Legal</h5>
                            <ul>
                                <li> <Link to="#">Privacy Policy</Link> </li>
                                <li> <Link to="#">Refund Policy</Link> </li>
                                <li> <Link to="#">Cookie Policy</Link> </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-12 footer-widget">
                            <h5 className="widget-title">Newsletter</h5>
                            <p>Join our newsletter today, and get the best flats that we have to offer.</p>
                            <form method="post">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Email Address" name="newsletter-email" />
                                </div>
                                <button type="submit" className="btn-custom primary light btn-block" name="button">Join Newsletter</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="m-0">© Copyright 2020 - <Link to="#">AndroThemes</Link> All Rights Reserved.</p>
                            </div>
                            <div className="col-lg-5">
                                <ul>
                                    <li> <Link to="#">Find a Home</Link> </li>
                                    <li> <Link to="#">Add Listing</Link> </li>
                                    <li> <Link to="#">View Brokers</Link> </li>
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