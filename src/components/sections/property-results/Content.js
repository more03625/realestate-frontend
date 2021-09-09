import React, { useState, Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import Sidebar from "../../layouts/Shopsidebar";
import classNames from "classnames";
import Loader from "../../layouts/Loader";
import { Host, convertToSlug, openInGmail, uppercaseFirstLetter, saveProperty } from "../../../helper/comman_helper";
import { Noresults } from '../../layouts/Noresults';

const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;

const Content = ({ propertyType, searchQuery, searchResults, subCategoryName, subCategoryID, totalResults, offset, setOffset, setSelectedFilters, loadingButton }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [loading, setLoading] = useState(false);

    const handleClick = (event) => {
        if (event.target.getAttribute("data-action") === 'next') {
            setOffset(offset + 1)
            setLoading(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setLoading(false);
            }, 2000);
        } else if (event.target.getAttribute("data-action") === 'previous') {
            setOffset(offset - 1)
            setLoading(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setLoading(false);
            }, 2000);
        } else {
            setOffset(Number(event.target.getAttribute("data-page")) - 1);
            setLoading(true);
            setTimeout(() => {
                setCurrentPage(Number(event.target.getAttribute("data-page")));
                setLoading(false);
            }, 2000);
        }
    };

    let currentitems;
    if (totalResults == 0) {
        currentitems = [];
    } else {
        currentitems = searchResults
    }


    var renderitems = [];
    console.log(totalResults)
    // currentitems.length !== 0 &&
    if (totalResults === undefined) {
        var renderitems = <Loader />
    }
    else if (totalResults == 0) {
        var renderitems = <Noresults />;
    }
    else {
        var renderitems = currentitems && currentitems.map((item, i) => {
            var propertyURL = "property" + "/" + convertToSlug(item.title) + "/" + item.id;
            return (
                <div key={i} className="listing listing-list">
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
                                <span className="listing-badge sale">For Sell</span>
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
            );
        });
    }
    // Logic for displaying page numbers
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalResults / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPagination = pageNumbers.map((number) => {
        const activeCondition = currentPage === number ? "active" : "";
        return (
            <Fragment key={number}>
                {pageNumbers.length > 1 ? (
                    <li className={classNames("page-item", { active: activeCondition })}>
                        <Link
                            className="page-link"

                            to={window.location.href.split("property-results")[1]}
                            data-page={number}
                            onClick={handleClick}
                        >
                            {number}
                        </Link>
                    </li>
                ) : (
                    ""
                )}
            </Fragment>
        );
    });
    return (
        <div className="section pagination-content">
            <div className="container">

                <div className="row">
                    {/* Sidebar Start */}
                    <div className="col-lg-4">
                        <Sidebar setSelectedFilters={setSelectedFilters} loadingButton={loadingButton} />
                    </div>
                    {/* Sidebar End */}
                    {/* Posts Start */}
                    <div className="col-lg-8">
                        {/* Controls Start */}

                        <div className="acr-global-listing-controls">
                            <div className="acr-listing-active-filters">


                                <Link to={window.location.href.split("property-results")[1]}>
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    {subCategoryName ? subCategoryName : propertyType}
                                </Link>
                            </div>
                        </div>

                        {/* Controls End */}
                        <div className="row">
                            {/* Listing Start */}
                            {loading === false ? renderitems : <Loader />}
                            {/* Listing End */}
                        </div>
                        {/* Pagination Start */}
                        {pageNumbers.length > 1 ? (
                            <ul className="pagination">
                                {/* Prev */}
                                {/* to show previous, we need to be on the 2nd or more page */}
                                {pageNumbers.length > 1 && currentPage !== 1 ? (
                                    <li className="page-item">

                                        {
                                            subCategoryName && subCategoryID ?
                                                <Link
                                                    className="page-link"
                                                    to={`?category=${subCategoryName}&category_id=${subCategoryID}`}
                                                    data-page={parseInt(currentPage) - 1}
                                                    data-action="previous"
                                                    onClick={handleClick}
                                                >
                                                    <i className="fas fa-chevron-left" data-page={parseInt(currentPage) - 1} data-action="previous" />
                                                </Link>
                                                :
                                                <Link
                                                    className="page-link"
                                                    to={`?search=${searchQuery}&property_type=${propertyType}`}
                                                    data-page={parseInt(currentPage) - 1}
                                                    data-action="previous"
                                                    onClick={handleClick}
                                                >

                                                    <i className="fas fa-chevron-left" data-page={parseInt(currentPage) - 1} data-action="previous" />
                                                </Link>
                                        }

                                    </li>
                                ) : (
                                    ""
                                )}
                                {/* Prev */}
                                {renderPagination}
                                {/* Next */}
                                {/* to show next, we should not be on the last page */}
                                {pageNumbers.length > 1 &&
                                    currentPage !== pageNumbers.length ? (
                                    <li className="page-item right-btn">
                                        <Link
                                            className="page-link"
                                            to={`?search=${searchQuery}&property_type=${propertyType}`}
                                            data-page={currentPage} data-action="next"
                                            onClick={handleClick}
                                        >
                                            <i className="fas fa-chevron-right" data-page={currentPage} data-action="next" />
                                        </Link>
                                    </li>
                                ) : (
                                    ""
                                )}
                                {/* Next */}
                            </ul>
                        ) : (
                            ""
                        )}
                        {/* Pagination End */}
                    </div>
                    {/* Posts End */}
                </div>
            </div>
        </div>
    );
};

export default Content;
