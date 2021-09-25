import React from 'react'
import { Link } from 'react-router-dom';
import { Host, uppercaseFirstLetter, openInGmail, convertToSlug } from '../../../helper/comman_helper';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";

const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;

export default function Listingproperties({ properties }) {
    return (
        <>
            {
                properties && properties.map((item, i) => {
                    var propertyURL = "property" + "/" + convertToSlug(item.title) + "/" + item.id;
                    return <div key={i} className="listing listing-list">
                        <div className="listing-thumbnail">
                            <Link to={propertyURL}>
                                <img
                                    src={Host + item.image + "_medium.jpg"}
                                    alt={item.image + ".jpg"}
                                    className="custom-images"
                                />
                            </Link>
                            <div className="listing-badges">
                                {item.property_type === "buy" ? (
                                    <span className="listing-badge sale">For Sale</span>
                                ) : (
                                    ""
                                )}
                                {item.property_type === "sold" ? (
                                    <span className="listing-badge pending">{uppercaseFirstLetter(item.property_type)}</span>
                                ) : (
                                    ""
                                )}
                                {item.property_type === "rent" ? (
                                    <span className="listing-badge rent">For {uppercaseFirstLetter(item.property_type)}</span>
                                ) : (
                                    ""
                                )}
                                {item.property_type === "share" ? (
                                    <span className="listing-badge rent">For {uppercaseFirstLetter(item.property_type)}</span>
                                ) : (
                                    ""
                                )}
                                {item.property_type === "invest" ? (
                                    <span className="listing-badge sale">To {uppercaseFirstLetter(item.property_type)}</span>
                                ) : (
                                    ""
                                )}
                                {item.property_type === "lease" ? (
                                    <span className="listing-badge sale">To {uppercaseFirstLetter(item.property_type)}</span>
                                ) : (
                                    ""
                                )}
                            </div>

                        </div>
                        <div className="listing-body">
                            <div className="listing-author">
                                <img src={
                                    item && item.is_contact_show === 1 ? item && item.profile_image !== null ?
                                        Host + item.profile_image + "_small.jpg" : Host + "/users/default.png"
                                        : Host + "/neprealestate-logo/logo.png"}
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
                                                <Link to={{ pathname: `tel:${item.number_for_contact}` }}>
                                                    {" "}
                                                    <i className="fas fa-phone" />
                                                    Call Agent
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
                                                <Link to={propertyURL}>
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
                                <Link to={propertyURL} title={item.title}>
                                    {item.id}) {item.title}
                                </Link>{" "}
                            </h5>
                            <p className="listing-text">
                                <Link className="location-text" to={'#'} >
                                    <span>
                                        <i className="fas fa-map-marker-alt"></i>
                                    </span>
                                    {" "}{item.address + "..."}
                                </Link>
                            </p>
                            <span className="listing-price">
                                Rs. {new Number(item.price).toLocaleString()}
                                <span> {item.price_on}</span>{" "}
                            </span>
                            <p className="listing-text">{item.text}</p>
                            <div className="acr-listing-icons">
                                <OverlayTrigger overlay={bedstip}>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-bedroom" />
                                        <span className="acr-listing-icon-value">{item.no_of_beds}</span>
                                    </div>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={bathstip}>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-bathroom" />
                                        <span className="acr-listing-icon-value">{item.no_of_bathrooms}</span>
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
                                    to={propertyURL}
                                    className="btn-custom btn-sm secondary"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    </div>
                })
            }

        </>
    )
}
