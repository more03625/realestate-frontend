import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import Axios from 'axios';
import { openInGmail, saveProperty, Endpoints, Host, convertToSlug, uppercaseFirstLetter } from "../../../helper/comman_helper";



const Recentlisting = ({ recentProperties }) => {
  const listingThumbnail = {
    borderRadius: "0px"
  }
  const listing = {
    padding: "0px"
  }
  const listingBody = {
    margin: "10px",
    padding: "7px"
  }
  const bedstip = <Tooltip>Beds</Tooltip>;
  const bathstip = <Tooltip>Bathrooms</Tooltip>;

  return (
    <div className="section section-padding">
      <div className="container">
        <div className="section-title-wrap section-header flex-header">
          <div className="section-title-text">
            <h5 className="custom-primary">Find Your Home</h5>
            <h2 className="title">Recent Listings</h2>
          </div>
          <Link to={`/property-results?property_type=${window.location.pathname.split("/")[1]}`} className="btn-custom">
            View All
          </Link>
        </div>
        <div className="row">
          {/* Listing Start */}
          {recentProperties && recentProperties.slice(0, 4).map((item, i) => (
            <div key={i} className="col-lg-4">
              <div className="listing" style={listing}>
                <div className="listing-thumbnail" style={listingThumbnail}>
                  <Link to={`/property/${convertToSlug(item.title)}/${item.id}`}>
                    <img // thumbnail
                      src={item.image != null ? process.env.REACT_APP_CONTENT_URL + item.image + "_medium.jpg" : process.env.REACT_APP_CONTENT_URL + "/properties/default.jpg"}
                      alt={`image of ${item.title}`}
                      className="custom-images"
                      style={listingThumbnail}
                    />
                  </Link>

                  <div className="listing-badges">
                    {item.property_type === "buy" ? (
                      <span className="listing-badge sale">Sell</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "sold" ? (
                      <span className="listing-badge pending">{uppercaseFirstLetter(item.property_type)}</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "rent" ? (
                      <span className="listing-badge rent">{uppercaseFirstLetter(item.property_type)}</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "share" ? (
                      <span className="listing-badge rent">{uppercaseFirstLetter(item.property_type)}</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "invest" ? (
                      <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
                    ) : (
                      ""
                    )}
                    {item.property_type === "lease" ? (
                      <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
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
                <div className="listing-body" style={listingBody}>
                  <div className="listing-author">
                    <img src={item && item.is_contact_show === 1 ? item && item.profile_image != null ? process.env.REACT_APP_CONTENT_URL + item.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png" : process.env.REACT_APP_CONTENT_URL + "/neprealestate-logo/logo.png"}
                      alt={item.profile_image + "_small.jpg"}
                    />
                    <div className="listing-author-body">
                      <p>
                        {" "}
                        <Link to="#">{item.name_for_contact}</Link>{" "}
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
                            <Link target="_blank" to={{ pathname: `${openInGmail(item.email_for_contact, item.title, Host + "/property/" + convertToSlug(item.title) + "/" + item.id)}` }}>
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
                  <p className="listing-text"><Link to={'#'} > <span><i className="fas fa-map-marker-alt"></i></span> {item.title.slice(0, 44) + "..."}</Link></p>
                  <span className="listing-price">
                    Rs. {new Number(item.price).toLocaleString()}
                    <span> {item.price_on}</span>{" "}
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
                    <OverlayTrigger overlay={<Tooltip>Sqft</Tooltip>}>
                      <div className="acr-listing-icon">
                        <i className="flaticon-ruler" />
                        <span className="acr-listing-icon-value">
                          {item.area_in_sqft}
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
                    {/*
 <OverlayTrigger overlay={gallerytip}>
                      <Link to={`/property/${convertToSlug(item.title)}/${item.id}`} className="listing-gallery">
                        {" "}
                        <i className="fas fa-camera" />{" "}
                      </Link>
                    </OverlayTrigger>
                  */}

                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Listing End */}
        </div>


      </div>
    </div>
  );
}

export default Recentlisting;
