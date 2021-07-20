import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import listing from "../../../data/listings.json";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import { Endpoints, Host, convertToSlug } from "../../../helper/server";
import { successToast, errorToast } from "../../../helper/Toasthelper";
import { openInGmail } from "../../../helper/comman_helper";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;
const Content = () => {
  const [myProperties, setMyProperties] = useState([]);

  const getMyProperties = () => {
    var url = Host + Endpoints.getPropertiesBySellerID;
    var data = {
      "id": 3,
      "search": "",
      "limit": 5,
      "offset": 0,
      "order_col": "id",
      "order_by": "desc"
    }
    Axios.post(url, data, {
      headers: {
        token: process.env.REACT_APP_ACCESS_TOKEN_SECRET
      }
    }).then((response) => {
      if (response.data.error === true) {
        errorToast(response.data.title);
      } else {
        setMyProperties(response.data.data.users);
      }
    });
  }
  useEffect(() => {
    getMyProperties();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <ToastContainer />
          <div className="col-lg-4">
            <div className="sidebar sticky-sidebar user-nav sidebar-left">
              <ul>
                <li>
                  {" "}
                  <Link to="/profile"> Edit Profile</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link className="active" to="/profile-listings">
                    My Listings
                  </Link>{" "}
                </li>
                {/*
                  <li>
                    {" "}
                    <Link to="/profile-saved-listings">
                      Saved Listings
                    </Link>{" "}
                  </li>
                  */}
                <li>
                  {" "}
                  <Link className="logout" to="/logout">
                    <i className="flaticon-shut-down-button" /> Logout
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            {/* Listing Start */}
            {myProperties.slice(0, 4).map((item, i) => (
              <div key={i} className="listing listing-list">
                <div className="listing-thumbnail">
                  <Link to={`/property/${convertToSlug(item.title)}/${item.id}`}>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/img/listings-list/" + item.image}
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
                    {item.property_type === "buy" ? (
                      <span className="listing-badge sale">On Sale</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "rent" ? (
                      <span className="listing-badge pending">On Rent</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "sold" ? (
                      <span className="listing-badge rent">On Sold</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "share" ? (
                      <span className="listing-badge rent">On Share</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="listing-controls">
                    <Link to="#" className="favorite">
                      <i className="far fa-heart" />
                    </Link>

                  </div>
                </div>
                <div className="listing-body">
                  <div className="listing-author">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/img/people/3.jpg"}
                      alt="author"
                    />
                    <div className="listing-author-body">
                      <p>
                        {" "}
                        <Link to="#">Rahul More</Link>{" "}
                      </p>
                      <span className="listing-date">{new Date(item.createdAt).toDateString()}</span>
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
                            <Link target="_blank" to={{ pathname: `${openInGmail(item.email_for_contact)}` }}>
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
                    Rs. {new Intl.NumberFormat().format(
                      21525
                    )}
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
                      <Link to={`/property/${convertToSlug(item.title)}/${item.id}`} className="listing-gallery">
                        {" "}
                        <i className="fas fa-camera" />{" "}
                      </Link>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            ))}
            {/* Listing End */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
