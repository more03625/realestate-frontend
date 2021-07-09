import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  OverlayTrigger,
  Tooltip,
  Dropdown,
  NavLink,
  Accordion,
  Card,
} from "react-bootstrap";
import listing from "../../../data/listings.json";
import Calculator from "../../layouts/Calculator";
import $ from "jquery";
import "magnific-popup";
import classNames from "classnames";
import Slider from "react-slick";

// Gallery
const listinggallery = [
  { img: "assets/img/listing-single/2.jpg" },
  { img: "assets/img/listing-single/3.jpg" },
  { img: "assets/img/listing-single/4.jpg" },
  { img: "assets/img/listing-single/5.jpg" },
];

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Square Feet</Tooltip>;

const mainslider = [
  { img: "assets/img/listing-single/2.jpg" },
  { img: "assets/img/listing-single/3.jpg" },
  { img: "assets/img/listing-single/4.jpg" },
  { img: "assets/img/listing-single/5.jpg" },
  { img: "assets/img/listing-single/6.jpg" },
];
const thumbslider = [
  { img: "assets/img/listing-single/2-2.jpg" },
  { img: "assets/img/listing-single/3-2.jpg" },
  { img: "assets/img/listing-single/4-2.jpg" },
  { img: "assets/img/listing-single/5-2.jpg" },
  { img: "assets/img/listing-single/6-2.jpg" },
];
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};
const settingsthumb = {
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  centerMode: false,
  focusOnSelect: true,
  autoplay: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
const Listingwrapper = () => {
  const [showmore, setShowMore] = useState(false);

  var showmoretoggle = () => {
    setShowMore(!showmore);
  };
  //   showmoretoggle = showmoretoggle.bind(this);

  function popup() {
    $(".gallery-thumb").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }
  useEffect(() => {
    popup();
  }, []);

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const [fnameError, setFnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [commentError, setCommentError] = useState("");

  const isValid = () => {
    var emailValidator = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);

    if (
      fname === "" &&
      phone === "" &&
      date === "" &&
      comment === "" &&
      !emailValidator
    ) {
      setFnameError("Name feild should not be empty!");
      setEmailError("Please enter a valid email address!");
      setPhoneError("Please enter valid 10 digit mobile number!");
      setDateError("Date feild in required!");
      setCommentError("Mobile Number feild should not be empty!");
    } else if (fname === "") {
      setFnameError("Name feild should not be empty!");
    } else if (!emailValidator) {
      setEmailError("Please enter a valid email address!");
    } else if (phone === "" || phone.length < 10) {
      setPhoneError("Please enter valid 10 digit mobile number!");
    } else if (date === "") {
      setDateError("Date feild in required!");
    } else if (comment === "") {
      setCommentError("Mobile Number feild should not be empty!");
    } else {
      return true;
    }
  };
  const submitFun = (e) => {
    e.preventDefault();

    setFnameError("");
    setEmailError("");
    setPhoneError("");
    setDateError("");
    setCommentError("");

    if (isValid()) {
      console.log(fname);
      console.log(email);
      console.log(phone);
      console.log(date);
      console.log(comment);
      alert("All ok, evrything in console");
    } else {
      console.log("In else");
    }
  };

  return (
    <div className="section listing-wrapper">
      <div className="container">
        <div className="row">
          {/* Listings Start */}
          <div className="col-lg-8">
            <div className="listing-thumbnail">
              <Slider
                className="listing-thumbnail-slider-main col-12"
                // asNavFor={this.state.nav2}
                // ref={(slider) => (this.slider1 = slider)}
                {...settings}
              >
                {mainslider.map((item, i) => (
                  <Link
                    key={i}
                    to={item.img}
                    className="slider-thumbnail-item gallery-thumb"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/" + item.img}
                      alt="listing"
                    />
                  </Link>
                ))}
              </Slider>
              <Slider
                className="listing-thumbnail-slider-nav"
                // asNavFor={this.state.nav1}
                // ref={(slider) => (this.slider2 = slider)}
                {...settingsthumb}
              >
                {thumbslider.map((item, i) => (
                  <div key={i} className="slider-thumbnail-item col-12">
                    <img
                      src={process.env.PUBLIC_URL + "/" + item.img}
                      alt="listing"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/* Content Start */}
            <div className="listing-content">
              <h4>Property Overview</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
                <Link to="#">Lorem Ipsum has been the industry's</Link> standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            {/* Content End */}
            {/* Price Range In the area Start */}
            <div className="section">
              <div className="acr-area-price">
                <span style={{ left: "30%" }}>Rs. 852,000</span>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="acr-area-price-wrapper">
                  <div className="acr-area-price-min">
                    <h5>Rs. 562,000</h5>
                    <span>Lowest</span>
                  </div>
                  <h5>Price range in the area</h5>
                  <div className="acr-area-price-max">
                    <h5>Rs. 1,280,000</h5>
                    <span>Highest</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Price Range In the area End */}
            <div className="section section-padding pt-0 acr-listing-features">
              <h4>Features</h4>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="listing-feature-wrapper">
                    <div className="listing-feature">
                      <i className="flaticon-picture" />
                      <h6 className="listing-feature-label">Propery Type</h6>
                      <span className="listing-feature-value">House</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-bone" />
                      <h6 className="listing-feature-label">Pet Friendly</h6>
                      <span className="listing-feature-value">Yes</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-chair" />
                      <h6 className="listing-feature-label">Furnished</h6>
                      <span className="listing-feature-value">Yes</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-fan" />
                      <h6 className="listing-feature-label">Cooling</h6>
                      <span className="listing-feature-value">Yes</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="listing-feature-wrapper">
                    <div className="listing-feature">
                      <i className="flaticon-bathroom" />
                      <h6 className="listing-feature-label">Bathrooms</h6>
                      <span className="listing-feature-value">3</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-pillow" />
                      <h6 className="listing-feature-label">Bed Rooms</h6>
                      <span className="listing-feature-value">4</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-mailbox" />
                      <h6 className="listing-feature-label">Mail box</h6>
                      <span className="listing-feature-value">Yes</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-ruler" />
                      <h6 className="listing-feature-label">Property Size</h6>
                      <span className="listing-feature-value">3,000 Sqft</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={classNames(
                  "load-more-features btn-custom-2 light-grey btn-block",
                  { "d-none": showmore }
                )}
                onClick={showmoretoggle}
              >
                Show More
              </button>
              <div
                className={classNames("hidden-listing-features", {
                  "d-block": showmore,
                })}
              >
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="listing-feature">
                      <i className="flaticon-key" />
                      <h6 className="listing-feature-label">Property Id</h6>
                      <span className="listing-feature-value">BPFXQEI</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-garage" />
                      <h6 className="listing-feature-label">Parking</h6>
                      <span className="listing-feature-value">Yes</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-history" />
                      <h6 className="listing-feature-label">Year Built</h6>
                      <span className="listing-feature-value">1979</span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="listing-feature">
                      <i className="flaticon-new" />
                      <h6 className="listing-feature-label">Condition</h6>
                      <span className="listing-feature-value">New</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-ruler" />
                      <h6 className="listing-feature-label">Lot Size</h6>
                      <span className="listing-feature-value">89 Acres</span>
                    </div>
                    <div className="listing-feature">
                      <i className="flaticon-eye" />
                      <h6 className="listing-feature-label">View</h6>
                      <span className="listing-feature-value">City View</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section pt-0">
              <h4>Property Video</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap
              </p>
              <div className="embed-responsive embed-responsive-21by9">
                <iframe
                  title="video"
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/Sz_1tkcU0Co"
                />
              </div>
            </div>
            <div className="section pt-0">
              <h4>Schedule Link tour</h4>
              <form onSubmit={submitFun}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="fname"
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {fnameError}
                    </p>
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {emailError}
                    </p>
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {phoneError}
                    </p>
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date"
                      name="date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {dateError}
                    </p>
                  </div>
                  <div className="col-md-12 form-group">
                    <textarea
                      className="form-control"
                      placeholder="Type your comment..."
                      name="comment"
                      onChange={(e) => setComment(e.target.value)}
                      rows={7}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {commentError}
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-custom primary"
                  name="button"
                >
                  Schedule Tour
                </button>
              </form>
            </div>
            {/* Pagination Start */}
            <div className="section p-0 post-single-pagination-wrapper">
              <div className="post-single-pagination post-prev">
                <i className="fas fa-arrow-left" />
                <Link to="#" className="post-single-pagination-content">
                  <span>Prev Listing</span>
                  <h6>Theodore Lowe, Azusa New York 39531</h6>
                </Link>
              </div>
              <div className="post-single-pagination post-next">
                <Link to="#" className="post-single-pagination-content">
                  <span>Next Listing</span>
                  <h6>Cecilia Chapman, Mankato Mississippi 96522</h6>
                </Link>
                <i className="fas fa-arrow-right" />
              </div>
            </div>
            {/* Pagination End */}
            {/* Similar Start */}
            <div className="section section-padding">
              <h4>Similar Listings</h4>
              <div className="row">
                {/* Listing Start */}
                {listing.slice(0, 2).map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="listing">
                      <div className="listing-thumbnail">
                        <Link to="/listing-details-v1">
                          <img
                            src={process.env.PUBLIC_URL + "/" + item.gridimg}
                            alt="listing"
                          />
                        </Link>
                        <div className="listing-badges">
                          {item.star === true ? (
                            <span className="listing-badge featured">
                              {" "}
                              <i className="fas fa-star" />{" "}
                            </span>
                          ) : (
                            ""
                          )}
                          {item.sale === true ? (
                            <span className="listing-badge sale">On Sale</span>
                          ) : (
                            ""
                          )}
                          {item.pending === true ? (
                            <span className="listing-badge pending">
                              {" "}
                              Pending
                            </span>
                          ) : (
                            ""
                          )}
                          {item.rental === true ? (
                            <span className="listing-badge rent"> Rental</span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="listing-controls">
                          <Link to="#" className="favorite">
                            <i className="far fa-heart" />
                          </Link>
                          <Link to="#" className="compare">
                            <i className="fas fa-sync-alt" />
                          </Link>
                        </div>
                      </div>
                      <div className="listing-body">
                        <div className="listing-author">
                          <img
                            src={process.env.PUBLIC_URL + "/" + item.authorimg}
                            alt="author"
                          />
                          <div className="listing-author-body">
                            <p>
                              {" "}
                              <Link to="#">{item.authorname}</Link>{" "}
                            </p>
                            <span className="listing-date">
                              {item.postdate}
                            </span>
                          </div>
                          <Dropdown className="options-dropdown">
                            <Dropdown.Toggle as={NavLink}>
                              <i className="fas fa-ellipsis-v" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                              <ul>
                                <li>
                                  {" "}
                                  <Link to="tel:+123456789">
                                    {" "}
                                    <i className="fas fa-phone" /> Call Agent
                                  </Link>{" "}
                                </li>
                                <li>
                                  {" "}
                                  <Link to="mailto:+123456789">
                                    {" "}
                                    <i className="fas fa-envelope" /> Send
                                    Message
                                  </Link>{" "}
                                </li>
                                <li>
                                  {" "}
                                  <Link to="/listing-details-v1">
                                    {" "}
                                    <i className="fas fa-bookmark" /> Book Tour
                                  </Link>{" "}
                                </li>
                              </ul>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <h5 className="listing-title">
                          {" "}
                          <Link to="/listing-details-v1" title={item.title}>
                            {item.title}
                          </Link>{" "}
                        </h5>
                        <span className="listing-price">
                          Rs.{" "}
                          {new Intl.NumberFormat().format(
                            item.monthlyprice.toFixed(2)
                          )}
                          <span>/month</span>{" "}
                        </span>
                        <p className="listing-text">{item.text}</p>
                        <div className="acr-listing-icons">
                          <OverlayTrigger overlay={bedstip}>
                            <div className="acr-listing-icon">
                              <i className="flaticon-bedroom" />
                              <span className="acr-listing-icon-value">
                                {item.beds}
                              </span>
                            </div>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={bathstip}>
                            <div className="acr-listing-icon">
                              <i className="flaticon-bathroom" />
                              <span className="acr-listing-icon-value">
                                {item.bathrooms}
                              </span>
                            </div>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={areatip}>
                            <div className="acr-listing-icon">
                              <i className="flaticon-ruler" />
                              <span className="acr-listing-icon-value">
                                {new Intl.NumberFormat().format(item.area)}
                              </span>
                            </div>
                          </OverlayTrigger>
                        </div>
                        <div className="listing-gallery-wrapper">
                          <Link
                            to="/listing-details-v1"
                            className="btn-custom btn-sm secondary"
                          >
                            View Details
                          </Link>
                          <OverlayTrigger overlay={gallerytip}>
                            <Link to="#" className="listing-gallery">
                              {" "}
                              <i className="fas fa-camera" />{" "}
                            </Link>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Listing End */}
              </div>
            </div>
            {/* Similar End */}
          </div>
          {/* Listings End */}
          {/* Sidebar Start */}
          <div className="col-lg-4">
            <div className="sidebar sticky-sidebar">
              <div className="sidebar-widget">
                <h5>Contact Person</h5>
                {/* Author Start */}
                <div className="media sidebar-author listing-agent">
                  <Link to="#">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/img/people/1.jpg"}
                      alt="agent"
                    />
                  </Link>
                  <div className="media-body">
                    <h6>
                      {" "}
                      <Link to="#">Freddy Burben</Link>{" "}
                    </h6>
                    <span>Company Agent</span>
                  </div>
                  <Dropdown className="options-dropdown">
                    <Dropdown.Toggle as={NavLink}>
                      <i className="fas fa-ellipsis-v" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <ul>
                        <li>
                          {" "}
                          <Link to="tel:+123456789">
                            {" "}
                            <i className="fas fa-phone" /> Call Agent
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link to="/listing-grid">
                            {" "}
                            <i className="fas fa-th-list" /> View Listings
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link to="#">
                            {" "}
                            <i className="fas fa-star" /> Save Agent
                          </Link>{" "}
                        </li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* Author End */}
                {/* Contact Start */}
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Enter your message"
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-custom primary light btn-block"
                  >
                    Send Message
                  </button>
                </form>
                {/* Contact End */}
              </div>
              <div className="sidebar-widget">
                <h5>Recent Listings</h5>
                {/* Listing Start */}
                {listing
                  .filter(function (item) {
                    return item.recent === true;
                  })
                  .slice(0, 4)
                  .map((item, i) => (
                    <div key={i} className="listing listing-list">
                      <div className="listing-thumbnail">
                        <Link to="/listing-details-v1">
                          <img
                            src={process.env.PUBLIC_URL + "/" + item.gridimg}
                            alt="listing"
                          />
                        </Link>
                      </div>
                      <div className="listing-body">
                        <h6 className="listing-title">
                          {" "}
                          <Link to="/listing-details-v1" title={item.title}>
                            {item.title}
                          </Link>{" "}
                        </h6>
                        <span className="listing-price">
                          Rs.{" "}
                          {new Intl.NumberFormat().format(
                            item.monthlyprice.toFixed(2)
                          )}
                          <span>/month</span>{" "}
                        </span>
                      </div>
                    </div>
                  ))}
                {/* Listing End */}
              </div>
              <div className="sidebar-widget">
                <h5>Mortgage Calculator</h5>
                <Calculator />
              </div>
            </div>
          </div>
          {/* Sidebar End */}
        </div>
      </div>
    </div>
  );
};

export default Listingwrapper;
