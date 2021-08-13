import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footercontent extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 footer-widget">
              <div className="footer-logo" style={{ width: 125 }}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/realestaelogo/logo.png"
                  }
                  alt="acres"
                />
              </div>
              <p>
                Connecting buyers, sellers, and agent effortlessly
              </p>
              <ul className="social-media">
                <li>
                  {" "}
                  <Link to="#">
                    {" "}
                    <i className="fab fa-facebook-f" />{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">
                    {" "}
                    <i className="fab fa-twitter" />{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">
                    {" "}
                    <i className="fab fa-pinterest-p" />{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">
                    {" "}
                    <i className="fab fa-linkedin-in" />{" "}
                  </Link>{" "}
                </li>
              </ul>
            </div>
            <div className="col-lg-2 offset-md-1 col-md-4 col-sm-6 footer-widget">
              <h5 className="widget-title">Menu</h5>
              <ul>
                <li>
                  {" "}
                  <Link to="/">Find Home</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/add-property">Add Listing</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/property-results?property_type=buy">Listings</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/news">News</Link>{" "}
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 footer-widget">
              <h5 className="widget-title">Legal</h5>
              <ul>
                <li>
                  {" "}
                  <Link to="/privacy-policy">Privacy Policy</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/terms-and-conditions">
                    Terms & conditions
                  </Link>{" "}
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <h5 className="widget-title" style={{ color: "#fff" }}>
                Contact us
              </h5>
              <ul>
                <li>
                  {" "}
                  <Link to="#">
                    <i className="fas fa-home"></i>&nbsp;&nbsp; 9- Madhyapur Thimi, Radhe Radhe, Bhaktapur

                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link target="_blank" to={{ pathname: "tel:977-1-6633484" }}>
                    <i className="fas fa-phone"></i>&nbsp;&nbsp; 977-1-6633484
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to={{ pathname: "mailto:info@neprealestate.com" }}>
                    <i className="fas fa-envelope"></i>
                    &nbsp;&nbsp;info@neprealestate.com
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <p className="m-0">
                  © Copyright {new Date().getFullYear()} - <Link to="/home">Neprealestate</Link> All
                  Rights Reserved.
                </p>
              </div>
              <div className="col-lg-5">
                <ul>
                  <li>
                    {" "}
                    <Link
                      to={{ pathname: "https://worldindia.com" }}
                      target="_blank"
                    >
                      Desgined & Developed by Dotcom Services India Pvt. Ltd.
                    </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footercontent;
