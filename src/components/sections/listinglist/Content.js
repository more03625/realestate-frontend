import React, { useState, Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import Sidebar from "../../layouts/Shopsidebar";
import listing from "../../../data/listings.json";
import classNames from "classnames";
import Loader from "../../layouts/Loader";
import Axios from "axios";
import { Endpoints, Host, uppercaseFirstLetter, openInGmail, convertToSlug } from "../../../helper/comman_helper";
import { Noresults } from "../../layouts/Noresults";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const gridtip = <Tooltip>Grid</Tooltip>;
const listtip = <Tooltip>List</Tooltip>;
const maptip = <Tooltip>Map</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;

const Content = ({ properties, searchResults, parentCallback }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState();

  const getStates = async () => {
    var url = Host + Endpoints.getStates;
    var result = await Axios.get(url);
    setStates(result.data.data);
  };

  useEffect((event) => {
    getStates();
  }, []);

  const handleClick = (event) => {
    var paginationContent = event.target.closest(".pagination-content");

    if (paginationContent) {
      console.log(paginationContent);
      paginationContent.scrollIntoView();
    }
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(Number(event.target.getAttribute("data-page")));
      setLoading(false);
    }, 2000);
  };

  // Logic for displaying items
  const indexOfLastitem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastitem - itemsPerPage;
  const currentitems = properties !== undefined || properties !== null ? properties.slice(indexOfFirstitem, indexOfLastitem) : [];

  var renderitems = [];
  if (currentitems.length !== 0) {
    var renderitems = currentitems && currentitems.map((item, i) => {
      var propertyURL = "property" + "/" + convertToSlug(item.title) + "/" + item.id;

      return (
        <div key={i} className="listing listing-list">
          <div className="listing-thumbnail">
            <Link to={propertyURL}>
              <img
                src={process.env.REACT_APP_CONTENT_URL + item.image + "_medium.jpg"}
                alt={item.image + ".jpg"}
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
                      <Link target="_blank" to={{
                        pathname: `${openInGmail(item.email_for_contact)}`
                      }} >
                        {" "}
                        < i className="fas fa-envelope" /> Send Message
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
              <OverlayTrigger overlay={gallerytip}>
                <Link to={propertyURL} className="listing-gallery">
                  {" "}
                  <i className="fas fa-camera" />{" "}
                </Link>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      );
    });
  } else {

    var renderitems = <Noresults />;
  }
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(properties.length / itemsPerPage); i++) {
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
              to="#"
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
            <Sidebar parentCallback={parentCallback} />
          </div>
          {/* Sidebar End */}
          {/* Posts Start */}
          <div className="col-lg-8">
            {/* Controls Start */}
            <div className="acr-global-listing-controls">
              <div className="acr-listing-active-filters">
                <Link to="#">
                  <div className="close-btn close-dark">
                    <span />
                    <span />
                  </div>
                  Commercial
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
                    <Link
                      className="page-link"
                      to="#"
                      data-page={currentPage - 1}
                      onClick={handleClick}
                    >
                      <i className="fas fa-chevron-left" />
                    </Link>
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
                  <li className="page-item">
                    <Link
                      className="page-link"
                      to="#"
                      data-page={parseInt(currentPage + 1)}
                      onClick={handleClick}
                    >
                      <i className="fas fa-chevron-right" />
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
