import React, { useState, Fragment, useEffect } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
// import Content from '../sections/listinglist/Content';
import Content from '../sections/property-results/Content';

import Axios from "axios";
import { Endpoints, Host, uppercaseFirstLetter, openInGmail, convertToSlug } from "../../helper/comman_helper";
const Listinglist = () => {
    const [searchResults, setSearchResults] = useState([]);

    const [properties, setProperties] = useState([]);
    const getCategories = () => {
        var url = Host + Endpoints.getPropertiesWithFilters;
        var data = {
            category: 2
        }

        Axios.post(url, data).then((response) => {
            setProperties(response.data.data.properties);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect((event) => {
        getCategories();
    }, []);

    const handleCallback = (childData) => {

        setProperties(childData);
    }
    return (
        <Fragment>
            <MetaTags>
                <title>Commercial properties| Neprealestate </title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'Commercial properties' }} />
            <Content properties={properties} searchResults={searchResults} parentCallback={handleCallback} />
            <Footer />
        </Fragment>
    );
}

export default Listinglist;