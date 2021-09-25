import React, { useState, Fragment, useRef } from "react";

import { Link } from "react-router-dom";
import Sidebar from "../../layouts/Shopsidebar";
import classNames from "classnames";
import Loader from "../../layouts/Loader";
import { Host, convertToSlug, openInGmail, uppercaseFirstLetter, cleanObject } from "../../../helper/comman_helper";
import { Noresults } from '../../layouts/Noresults';
import PaginationLogic from "../pagination-logic/PaginationLogic";
import Listingproperties from "./Listingproperties";



const Content = ({ propertyType, searchQuery, searchResults, subCategoryName, subCategoryID, totalResults, offset, setOffset, loadingButton, setFilterData, filterData, setRunUseEffect, runUseEffect, limit, setLimit }) => {


    const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    function advancedFilterModal() {
        setShow(!show);
    }
    let currentitems;
    if (totalResults == 0) {
        currentitems = [];
    } else {
        currentitems = searchResults
    }

    let renderitems;
    if (totalResults === undefined) {
        renderitems = <Loader />
    } else if (totalResults == 0) {
        renderitems = <Noresults />;
    } else {
        renderitems = <Listingproperties properties={currentitems} />
    }

    const queryParams = new URLSearchParams(window.location.search);
    var search = queryParams.get("search");
    var cleanObj = cleanObject(filterData);
    var filterCount = Object.keys(cleanObj).length
    // let autoComplete;

    // const [query, setQuery] = useState("");
    // const autoCompleteRef = useRef(null);
    // const options = {
    //     componentRestrictions: { country: "np" },
    // };
    // autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, options);
    // autoComplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);
    return (
        <div className="section pagination-content pt-0">
            <div className="container-fluid">
                <div className="search-bar-area">
                    <hr />
                    <div className="col-lg-12 mb-3 ">
                        <div className="row">
                            <div className="col-lg-6">
                                <input type="text" className="form-control" name="search" placeholder="Type search"
                                    defaultValue={search !== '' ? search : ''}
                                    onClick={advancedFilterModal}
                                // ref={autoCompleteRef}
                                // onChange={event => setQuery(event.target.value)}
                                />
                            </div>
                            <div className="col-lg-6">
                                <div className="acr-listing-active-filters">
                                    {
                                        <Link to={window.location.search} onClick={advancedFilterModal}>
                                            <div className="close-btn close-dark">
                                                <span />
                                                <span />
                                            </div>
                                            {filterData.property_type != undefined ? filterData.property_type : propertyType == null ? 'All' : propertyType}
                                        </Link>
                                    }
                                    {
                                        filterData.min_price !== undefined || filterData.max_price !== undefined ? (
                                            <Link to={window.location.search} onClick={advancedFilterModal}>
                                                <div className="close-btn close-dark">
                                                    <span />
                                                    <span />
                                                </div>
                                                {
                                                    filterData.min_price === undefined ? filterData.max_price && "Up to Rs. " + filterData.max_price :
                                                        filterData.max_price === undefined ? filterData.min_price && "Min Rs. " + filterData.min_price :
                                                            "Rs. " + filterData.min_price + " - Rs. " + filterData.max_price
                                                }
                                            </Link>

                                        ) : ('')
                                    }
                                    {
                                        filterData.min_beds !== undefined || filterData.max_beds !== undefined ? (
                                            <Link to={window.location.search} onClick={advancedFilterModal}>
                                                <div className="close-btn close-dark">
                                                    <span />
                                                    <span />
                                                </div>
                                                {
                                                    filterData.min_beds === undefined ? "Up to " + filterData.max_beds + " beds" :
                                                        filterData.max_beds === undefined ? filterData.min_beds + " + beds" :
                                                            filterData.min_beds + ' to ' + filterData.max_beds + ' beds'
                                                }
                                            </Link>
                                        ) : ('')
                                    }
                                    <Link to={window.location.search} onClick={advancedFilterModal}>
                                        <div className="close-btn close-dark">
                                            <span />
                                            <span />
                                        </div>
                                        {filterCount !== 0 ? filterCount : ''} Filters
                                    </Link>
                                    {
                                        subCategoryName &&
                                        <Link to={window.location.search} onClick={advancedFilterModal}>
                                            <div className="close-btn close-dark">
                                                <span />
                                                <span />
                                            </div>
                                            {subCategoryName}
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

            </div>
            <div className="container">

                <div className="row">
                    {/* Sidebar Start  */}
                    <div className="col-lg-4">
                        <Sidebar
                            loadingButton={loadingButton}
                            setShow={setShow}
                            show={show}
                            advancedFilterModal={advancedFilterModal}
                            filterData={filterData}
                            setFilterData={setFilterData}
                            setRunUseEffect={setRunUseEffect}
                            runUseEffect={runUseEffect}
                        />
                    </div>
                    {/* Sidebar End */}
                    {/* Posts Start */}
                    <div className="col-lg-8 offset-lg-2">

                        <div className="row">
                            {/* Listing Start */}
                            {loading === false ? renderitems : <Loader />}
                            {/* Listing End */}
                        </div>
                        {/* Pagination Start */}
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
                        {/* Pagination End */}
                    </div>
                    {/* Posts End */}
                    <div className="col-lg-2"></div>

                </div>
            </div>
        </div>
    );
};

export default Content;
