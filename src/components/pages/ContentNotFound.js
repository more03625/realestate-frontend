import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";

import Content from "../sections/error/ContentNotFound";

class ContentNotFound extends Component {
    render() {
        return (
            <>

                <Content />
                <Footer />
            </>
        );
    }
}

export default ContentNotFound;