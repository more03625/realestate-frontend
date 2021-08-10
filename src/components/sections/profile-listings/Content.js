import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import listing from "../../../data/listings.json";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import { openInGmail, successToast, errorToast, Endpoints, Host, convertToSlug, getUserToken, uppercaseFirstLetter } from "../../../helper/comman_helper";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;
const Content = ({ userData }) => {
  const [myProperties, setMyProperties] = useState([]);

  const getMyProperties = () => {
    var url = Host + Endpoints.getPropertiesBySellerID;
    var data = {
      "id": getUserToken().data.id,
      "search": "",
      "limit": 5,
      "offset": 0,
      "order_col": "id",
      "order_by": "desc"
    }
    Axios.post(url, data, {
      headers: {
        token: getUserToken().token
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
                  <Link className="active" to="/my-listings">
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

            {myProperties.length == 0 ?
              <div className="container text-center ">
                <div className="row justify-content-center">
                  <h5>There are no properties to show!</h5>
                </div>
                <div className="row justify-content-center">
                  <p>Start adding properties by clicking on Add properties!</p>

                </div>

                <div className="row justify-content-center">
                  <Link to="/add-property" className="btn-custom secondary mr-0">Add Properties <i className="fas mr-0 fa-plus" /> </Link>


                </div>
              </div>
              :

              myProperties && myProperties.slice(0, 4).map((item, i) => (
                <div key={i} className="listing listing-list">
                  <div className="listing-thumbnail">
                    <Link to={`/property/${convertToSlug(item.title)}/${item.id}`}>
                      <img
                        src={process.env.REACT_APP_CONTENT_URL + item.image + ".jpg"}
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
                      {item.property_type === "buy" ? (
                        <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
                      ) : (
                        ""
                      )}
                      {item.property_type === "rent" ? (
                        <span className="listing-badge pending">{uppercaseFirstLetter(item.property_type)}</span>
                      ) : (
                        ""
                      )}
                      {item.property_type === "sold" ? (
                        <span className="listing-badge rent">{uppercaseFirstLetter(item.property_type)}</span>
                      ) : (
                        ""
                      )}
                      {item.property_type === "share" ? (
                        <span className="listing-badge rent">{uppercaseFirstLetter(item.property_type)}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="listing-controls">
                      {/*
                      <Link to="#" className="favorite">
                        <i className="far fa-heart" />
                      </Link>
                      */}
                    </div>
                  </div>
                  <div className="listing-body">
                    <div className="listing-author">
                      <img
                        src={userData.profile_image != null ? process.env.REACT_APP_CONTENT_URL + userData.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                        alt={userData.profile_image + "_small.jpg"}
                      />
                      <div className="listing-author-body">
                        <p>
                          {" "}
                          <Link to="#">{getUserToken().data.name}</Link>{" "}
                        </p>
                        {console.log(new Date(item.createdAt).toDateString())}
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
                              <Link to={{ pathname: `edit-property/${convertToSlug(item.title)}/${item.id}` }}>
                                {" "}
                                <i className="fas fa-pen" /> Edit Property
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
