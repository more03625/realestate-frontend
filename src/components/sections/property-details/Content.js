import React, { Component, Fragment } from "react";
import Banner from "./Banner";
import Listingwrapper from "./Listingwrapper";

const Content = ({ propertyDetails, coordinates }) => {
    return (
        <Fragment>
            {/* <Banner/> */}
            <Listingwrapper propertyDetails={propertyDetails} coordinates={coordinates} />
        </Fragment>
    );
}

export default Content;
