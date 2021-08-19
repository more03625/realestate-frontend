import { Searchoptions, SearchButton } from "./Searchoptions";
import React, { useState, useEffect, useRef } from 'react';

export const BuyArea = ({ autoRef, setQuery }) => {
    const propertyType = 'buy';
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            ref={autoRef}
                            onChange={event => setQuery(event.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search Properties to own..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="buy" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const RentArea = ({ autoRef, setQuery }) => {
    const propertyType = 'rent';
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            ref={autoRef}
                            onChange={event => setQuery(event.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search properties to rent..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="rent" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const SoldArea = ({ autoRef, setQuery }) => {

    const propertyType = 'sold';
    return (<div className="agency-content">
        <div className="sidebar-widget">
            <form method="get" action="/property-results">
                <div className="search-wrapper">
                    <input
                        ref={autoRef}
                        onChange={event => setQuery(event.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Search for sold properties..."
                        name="search"
                    />
                    <i className="flaticon-search"></i>
                    <input type="hidden" name="property_type" value="sold" />
                    <SearchButton />
                </div>

                <div className="row">
                    <Searchoptions />
                </div>
            </form>
        </div>
    </div>
    )
}
export const ShareArea = ({ autoRef, setQuery }) => {
    const propertyType = 'share';
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            ref={autoRef}
                            onChange={event => setQuery(event.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search shared properties..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="share" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const FindAgents = () => {
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/find-agents">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Find agents here..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="consultants" />
                        <SearchButton />
                    </div>


                </form>
            </div>
        </div>
    )
}