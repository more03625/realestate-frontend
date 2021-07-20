import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Footer from "../layouts/Footerthree";
import Content from "../sections/property-details/Content";
import { useParams } from "react-router-dom";

const Listingdetailsone = () => {



    return (
        <Fragment>
            <MetaTags>
                <title>Property Details | Neprealestate</title>
                <meta name="description" content="#" />
            </MetaTags>
            <Header />
            <Content />
            <Footer />
        </Fragment>
    );

}

export default Listingdetailsone;