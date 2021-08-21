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
    const [coordinates, setCoordinates] = useState({ 'lat': null, "lang": null });


    const getPropertyDetails = async () => {
        var url = Host + Endpoints.getPropertyDetails + propertyID;
        const response = await Axios.get(url);
        if (response.data.error !== true) {

            setPropertyDetails(response.data.data);
            setCoordinates({ 'lat': response.data.data.latitude, "lang": response.data.data.longitude });
        } else {
            setPropertyDetails(false);
        }
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
            <Content propertyDetails={propertyDetails} coordinates={coordinates} />
            <Footer />
        </Fragment>
    );

}

export default Listingdetailsone;
