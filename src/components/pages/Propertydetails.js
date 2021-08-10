import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Footer from "../layouts/Footerthree";
import Content from "../sections/property-details/Content";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {

    Endpoints,
    Host,

} from "../../helper/comman_helper";

const Listingdetailsone = () => {
    const { slug, propertyID } = useParams();

    const [propertyDetails, setPropertyDetails] = useState(null);

    const getPropertyDetails = () => {
        var url = Host + Endpoints.getPropertyDetails + propertyID;
        Axios.get(url).then((response) => {
            if (response.data.error !== true) {
                setPropertyDetails(response.data.data);
            }
        });
    };
    useEffect(() => {
        getPropertyDetails();
    }, [propertyID]);
    return (
        <Fragment>
            <MetaTags>
                <title>{propertyDetails && propertyDetails.title} Property Details Neprealestate</title>
                <meta name="description" content="#" />
            </MetaTags>
            <Header />
            <Content propertyDetails={propertyDetails} />
            <Footer />
        </Fragment>
    );

}

export default Listingdetailsone;
