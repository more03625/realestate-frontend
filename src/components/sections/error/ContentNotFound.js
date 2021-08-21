import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { openInGmail, saveProperty, Endpoints, Host, uppercaseFirstLetter, convertToSlug } from "../../../helper/comman_helper";
import Axios from "axios";
import {
    OverlayTrigger,
    Tooltip,
    Dropdown,
    NavLink,

} from "react-bootstrap";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;
const Content = () => {
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
        getRecentProperties()
    }, []);

    return (
        <div className="section bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)", padding: "0px" }}>
            <div className="container">
                <div className="section-404" style={{ padding: "0px" }}>
                    <div className="section-404-text mb-0">
                        <h3>Sorry, this property isn't available.</h3>
                        <p className="subtitle">The link you followed may be broken, or the property may have been removed. Go back to Nep Real Estate.</p>
                        <Link to="/home" className="btn-custom">Go back Home</Link>
                    </div>
                </div>
            </div>
            <div className="acr-clouds">
                <div className="cloud-one" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud1.png)" }} />
                <div className="cloud-two" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud2.png)" }} />
                <div className="cloud-three" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud3.png)" }} />
                <div className="cloud-four" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud4.png)" }} />
                <div className="cloud-five" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud5.png)" }} />
            </div>



            <div className="section section-padding">
                <div className="container">
                    <div className="section-title-wrap section-header flex-header">

                        <div className="section-title-text">
                            <h5 className="custom-primary">You may find this useful</h5>
                            <h2 className="title">Related properties</h2>
                        </div>
                        {/*
                        <Link to="/listing-map" className="btn-custom">
                            View All
                        </Link>
                        */}
                    </div>
                    <div className="row">
                        {/* Listing Start */}
                        {recentProperties && recentProperties.slice(0, 6).map((item, i) => (
                            <div key={i} className="col-lg-4">
                                <div className="listing">
                                    <div className="listing-thumbnail " >
                                        <Link to={`/property/${convertToSlug(item.title)}/${item.id}`}>
                                            <img src={item.image != null ? process.env.REACT_APP_CONTENT_URL + item.image + "_medium.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                                                alt={`image of ${item.title}`}
                                                style={{ width: "300px", height: "200px" }}
                                            />
                                        </Link>

                                        <div className="listing-badges">

                                            {item.property_type === "buy" ? (
                                                <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
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
                                            <OverlayTrigger overlay={gallerytip}>
                                                <Link to={`/property/${convertToSlug(item.title)}/${item.id}`} className="listing-gallery">
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

        </div>
    );
}

export default Content;