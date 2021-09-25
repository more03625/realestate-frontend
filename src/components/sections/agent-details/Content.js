import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Dropdown, NavLink } from "react-bootstrap";
import { openInGmail, convertToSlug, errorToast, successToast } from "../../../helper/comman_helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { Host, Endpoints } from "../../../helper/comman_helper";
import { Noresults } from "../../layouts/Noresults";
import PaginationLogic from "../pagination-logic/PaginationLogic";
import Recentlisting from "../homefour/Recentlistings";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;

const Content = ({ agentData, agentProperties, similarAgents, totalResults, setOffset, offset, limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const [loadingButton, setLoadingButton] = useState(false);

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

    setLoadingButton(true);

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
        setLoadingButton(false);
        if (response.data.error === true) {
          errorToast(response.data.error);
        } else {
          e.target.reset();
          successToast(response.data.title);
        }
      }).catch(() => {

        setLoadingButton(false);

      })
    } else {
      setLoadingButton(false);
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
                  <img src={agentData && agentData.profile_image != null ? Host + agentData.profile_image + "_small.jpg" : Host + "/users/default.png"}
                    alt={agentData && agentData.profile_image + "_small.jpg"}
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
                    className="btn-custom primary light btn-block" disabled={loadingButton}
                  >
                    {loadingButton === true ?
                      <div className="ml-1 spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                      </div> : ''
                    }
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
            {
              agentProperties.length > 0 ? <Recentlisting properties={agentProperties} col="6" /> : <Noresults />
            }

            <PaginationLogic
              setLoading={setLoading}
              setOffset={setOffset}
              setCurrentPage={setCurrentPage}
              loading={loading}
              offset={offset}
              currentPage={currentPage}
              totalResults={totalResults}
              limit={limit}
            />

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
                          item.profile_image ? Host + item.profile_image +
                            "_small.jpg" : Host + "/users/default.png"
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
