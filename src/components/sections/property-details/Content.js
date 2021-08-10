import React, { Component, Fragment } from "react";
import Banner from "./Banner";
import Listingwrapper from "./Listingwrapper";

const Content = ({ propertyDetails }) => {
    return (
        <Fragment>
            {/* <Banner/> */}
            <Listingwrapper propertyDetails={propertyDetails} />
        </Fragment>
    );
}

export default Content;
