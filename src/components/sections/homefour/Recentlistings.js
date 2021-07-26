import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import listing from "../../../data/listings.json";
import Axios from 'axios';
import { openInGmail, saveProperty, Endpoints, Host, convertToSlug } from "../../../helper/comman_helper";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;

const Recentlisting = () => {
  const [recentProperties, setRecentProperties] = useState([]);

  const getRecentProperties = () => {
    var url = Host + Endpoints.getRecentProperties;
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert(response.data.title);
      } else {
        setRecentProperties(response.data.data);
      }
    });
  }
  useEffect(() => {
    getRecentProperties();
  }, []);

  return (
    <div className="section section-padding">
      <div className="container">
        <div className="section-title-wrap section-header flex-header">
          <div className="section-title-text">
            <h5 className="custom-primary">Find Your Home</h5>
            <h2 className="title">Recent Listings</h2>
          </div>
          <Link to="/listing-map" className="btn-custom">
            View All
          </Link>
        </div>
        <div className="row">
          {/* Listing Start */}
          {recentProperties.slice(0, 6).map((item, i) => (
            <div key={i} className="col-lg-4">
              <div className="listing">
                <div className="listing-thumbnail">
                  <Link to={`property/${convertToSlug(item.title)}/${item.id}`}>
                    <img
                      src={process.env.REACT_APP_CONTENT_URL + item.image + "_medium.jpg"}
                      alt={`image of ${item.title}`}
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
                  <div className="listing-controls">
                    <Link to="#" onClick={() => saveProperty(item.id)} className="favorite">
                      <i className="far fa-heart" />
                    </Link>

                  </div>
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
                            <Link to={{ pathname: `tel:${item.number_for_contact}` }}>
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
                            <Link to={`property/${convertToSlug(item.title)}/${item.id}#book_tour`}>
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
                    <Link to={`property/${convertToSlug(item.title)}/${item.id}`} title={item.title}>
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
                      to={`property/${convertToSlug(item.title)}/${item.id}`}
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
    </div>
  );
}

export default Recentlisting;
