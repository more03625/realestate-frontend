import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";

import Content from "../sections/error/NewsNotFound";

const NewsNotFound = ({ recentNews }) => {
    return (
        <>

            <Content recentNews={recentNews} />
            <Footer />
        </>
    );
}

export default NewsNotFound;