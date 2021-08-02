import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import agents from "../../../data/agents.json";
import listing from "../../../data/listings.json";
import { openInGmail, convertToSlug, errorToast, successToast } from "../../../helper/comman_helper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { Host, Endpoints } from "../../../helper/comman_helper";
import { Noresults } from "../../layouts/Noresults";
const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;

const Content = ({ agentData, agentProperties, similarAgents }) => {

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
      // date === "" &&
      comment === "" &&
      !emailValidator
    ) {
      setFnameError("Name feild should not be empty!");
      setEmailError("Please enter a valid email address!");
      setPhoneError("Please enter valid 10 digit mobile number!");
      // setDateError("Date feild in required!");
      setCommentError("Mobile Number feild should not be empty!");
    }
    else if (fname === "") {
      setFnameError("Name feild should not be empty!");
    }
    else if (!emailValidator) {
      setEmailError("Please enter a valid email address!");
    } else if (phone === "" || phone.length < 10) {
      setPhoneError("Please enter valid 10 digit mobile number!");
    }
    // else if (date === "") {
    //     setDateError("Date feild in required!");
    // }
    else if (comment === "") {
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
    // setDateError("");
    setCommentError("");

    if (isValid()) {
      var url = Host + Endpoints.propertyEnquiry;
      var userData = {
        email,
        mobile: phone,
        message: comment,
        property_id: 0,
        fullname: fname,
        enquiry_date: '2020-05-12'
      }

      Axios.post(url, userData).then((response) => {
        if (response.data.error === true) {
          errorToast(response.data.error);
        } else {
          e.target.reset();
          successToast(response.data.title);
        }
      });
    } else {
      console.log("In else");
    }
  };

  return (
    <div className="section agent-wrapper">
      <div className="container">
        <div className="row">
          <ToastContainer />
          {/* Agent Sidebar Start */}
          <div className="col-lg-4">
            <div className="sidebar sticky-sidebar sidebar-left">
              <div className="sidebar-widget sidebar-widget-agent">
                {/* Author Start */}
                <div className="media sidebar-author listing-agent">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/agents/1.jpg"}
                    alt="agent"
                  />
                  <div className="media-body">
                    <h6> {agentData && agentData.name} </h6>
                    <span>{agentData && agentData.are_you}</span>
                  </div>
                  <Dropdown className="options-dropdown">
                    <Dropdown.Toggle as={NavLink}>
                      <i className="fas fa-ellipsis-v" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <ul>
                        <li>
                          {" "}
                          <Link to={{ pathname: `${openInGmail(agentData && agentData.email, window.location.href)}` }}>
                            {" "}
                            <i className="fas fa-envelope" /> Send Message
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link target="_blank" to={{ pathname: `tel:${agentData && agentData.mobile}` }}>
                            {" "}
                            <i className="fas fa-phone" /> Call Now
                          </Link>{" "}
                        </li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* Author End */}
                <p>
                  {agentData && agentData.about_me}
                </p>
                {/* Contact Start */}
                <form onSubmit={submitFun}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="fname"
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {fnameError}
                    </p>
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
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
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Type your comment..."
                      name="comment"
                      onChange={(e) => setComment(e.target.value)}
                      rows={2}
                    />
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {commentError}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="btn-custom primary light btn-block"
                  >
                    Send Message
                  </button>
                  <ToastContainer />
                </form>
                {/* Contact End */}
              </div>
            </div>
          </div>
          {/* Agent Sidebar End */}
          {/* Agent Listings Start */}
          <div className="col-lg-8">
            <div className="row pt-0 section section-padding">
              {/* Listing Start */}
              {
                agentProperties.length > 0 ? (
                  agentProperties && agentProperties.slice(0, 4).map((item, i) => (
                    <div key={i} className="col-md-6">
                      <div className="listing">
                        <div className="listing-thumbnail " >
                          <Link to={`/property/${convertToSlug(item.title)}/${item.id}`}>

                            <img src={item.image != null ? process.env.REACT_APP_CONTENT_URL + item.image + "_medium.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                              alt={`image of ${item.title}`}
                              style={{ width: "300px", height: "200px" }}
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
                              <span className="listing-badge pending"> Pending</span>
                            ) : (
                              ""
                            )}
                            {item.rental === true ? (
                              <span className="listing-badge rent"> Rental</span>
                            ) : (
                              ""
                            )}
                          </div>
                          {/*
                            <div className="listing-controls">
                              <Link to="#" onClick={() => saveProperty(item.id)} className="favorite">
                                <i className="far fa-heart" />
                              </Link>
                            </div>
                          */}
                        </div>
                        <div className="listing-body">
                          <div className="listing-author">
                            <img src={item.profile_image != null ? process.env.REACT_APP_CONTENT_URL + item.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                              alt={item.profile_image + "_small.jpg"}
                            />
                            <div className="listing-author-body">
                              <p>
                                {" "}
                                <Link to="#">{item.name}</Link>{" "}
                              </p>
                              <span className="listing-date">{item.postdate}</span>
                            </div>
                            <Dropdown className="options-dropdown">
                              <Dropdown.Toggle as={NavLink}>
                                <i className="fas fa-ellipsis-v" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                <ul>
                                  <li>
                                    {" "}
                                    <Link target="_blank" to={{ pathname: `tel:${item.number_for_contact}` }}>
                                      {" "}
                                      <i className="fas fa-phone" /> Call Agent
                                    </Link>{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    <Link to={{ pathname: `${openInGmail(item.email_for_contact)}` }}>
                                      {" "}
                                      <i className="fas fa-envelope" /> Send Message
                                    </Link>{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    <Link to={`/property/${convertToSlug(item.title)}/${item.id}#book_tour`}>
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
                            <Link to={`/property/${convertToSlug(item.title)}/${item.id}`} title={item.title}>
                              {item.title}
                            </Link>{" "}
                          </h5>
                          <span className="listing-price">
                            Rs. {new Number(item.price).toLocaleString()}
                            <span>/month</span>{" "}
                          </span>
                          <p className="listing-text">{item.text}</p>
                          <div className="acr-listing-icons">
                            <OverlayTrigger overlay={bedstip}>
                              <div className="acr-listing-icon">
                                <i className="flaticon-bedroom" />
                                <span className="acr-listing-icon-value">
                                  {item.no_of_beds}
                                </span>
                              </div>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={bathstip}>
                              <div className="acr-listing-icon">
                                <i className="flaticon-bathroom" />
                                <span className="acr-listing-icon-value">
                                  {item.no_of_bathrooms}
                                </span>
                              </div>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={areatip}>
                              <div className="acr-listing-icon">
                                <i className="flaticon-ruler" />
                                <span className="acr-listing-icon-value">
                                  {item.area}
                                </span>
                              </div>
                            </OverlayTrigger>
                          </div>
                          <div className="listing-gallery-wrapper">
                            <Link
                              to={`/property/${convertToSlug(item.title)}/${item.id}`}
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
                  ))

                ) : (
                  <Noresults />
                )
              }

              {/* Listing End */}
            </div>

          </div>
          {/* Agent Listings End */}
        </div>
        {/* Similar Agents Start */}
        <div className="section pb-0">
          <h4 className="section-title">Similar Agents</h4>
          <div className="row">
            {/* Agent Start */}
            {similarAgents && similarAgents.slice(0, 3).map((item, i) => (
              <div key={i} className="col-lg-4">
                <div className="acr-agent">
                  <div className="acr-dots-wrapper acr-agent-thumb">
                    <div className="acr-dots" />
                    <Link to={`/agent/${convertToSlug(item.name) + "/" + item.id}`}>
                      <img

                        src={
                          item.profile_image ? process.env.REACT_APP_CONTENT_URL + item.profile_image +
                            "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"
                        }
                        className="agentsProfileArea"
                        alt={item && item.profile_image}
                      />
                    </Link>
                  </div>
                  <div className="acr-agent-body">
                    <h6>
                      {" "}
                      <Link to={`/agent/${convertToSlug(item.name) + "/" + item.id}`}>{item.name}</Link>{" "}
                    </h6>
                    <span>{item.post}</span>
                    <p>{item.about_me}</p>
                    <Link
                      to={`/agent/${convertToSlug(item.name) + "/" + item.id}`}
                      className="btn-custom secondary btn-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* Agent End */}
          </div>
        </div>
        {/* Similar Agents End */}
      </div>
    </div >
  );

}

export default Content;
