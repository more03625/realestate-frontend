import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Footer from '../layouts/Footerthree';
import Breadcrumb from '../layouts/Breadcrumb';
import Content from '../sections/property-results/Content';
import Axios from 'axios';
import { Endpoints, Host } from '../../helper/comman_helper';

const Propertyresults = () => {
    const queryParams = new URLSearchParams(window.location.search);
    var search = queryParams.get("search");
    var property_type = queryParams.get("property_type");
    var minBed = queryParams.get("min_beds");
    var maxBed = queryParams.get("max_beds");
    var minPrice = queryParams.get("min_price");
    var maxPrice = queryParams.get("max_price");
    var subCategoryID = queryParams.get("subcategory_id");
    var subCategoryName = queryParams.get("sub_category");
    var suburbs = queryParams.get("suburbs");

    const getSearchResults = () => {
        var searchURL = Host + Endpoints.getPropertiesWithFilters;
        var data = {
            "search": search,
            "property_type": property_type,
            'subcategory': subCategoryID,
            "min_beds": minBed,
            "max_beds": maxBed,
            "min_price": minPrice,
            "max_price": maxPrice,
            "suburbs": suburbs
        }
        Axios.post(searchURL, data)
            .then((response) => {

                if (response.data.error === true) {
                    console.log('There are some errors!');
                } else {
                    setSearchResults(response.data.data.properties);
                }
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getSearchResults();
    }, []);

    const [searchResults, setSearchResults] = useState([]);

    const handleCallback = (childData) => {
        setSearchResults(childData);
    }

    return (
        <Fragment>
            <MetaTags>
                <title>Results for {search ? search : subCategoryName || property_type ? property_type : 'properties'}</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'Results for properties' }} />

            <Content propertyType={property_type} searchQuery={search} searchResults={searchResults} parentCallback={handleCallback} subCategoryName={subCategoryName} subCategoryID={subCategoryID} />
            <Footer />
        </Fragment>


    );
}

export default Propertyresults;