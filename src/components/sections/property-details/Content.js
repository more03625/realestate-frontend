import React, { Component, Fragment } from "react";
import Banner from "./Banner";
import Listingwrapper from "./Listingwrapper";

const Content = ({ propertyDetails, coordinates, recentProperties }) => {
    return (
        <Fragment>
            {/* <Banner/> */}
            <Listingwrapper propertyDetails={propertyDetails} coordinates={coordinates} recentProperties={recentProperties} />
        </Fragment>
    );
}

export default Content;
