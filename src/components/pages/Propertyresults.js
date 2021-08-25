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

    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState();
    const [offset, setOffset] = useState(0)
    const [loadNext, setLoadNext] = useState();

    const [selectedFilters, setSelectedFilters] = useState();
    const [loadingButton, setLoadingButton] = useState(false);
    console.log(selectedFilters)
    const cleanObject = (obj) => {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
        return obj
    }
    const getSearchResults = async () => {
        setLoadingButton(true);

        var searchURL = Host + Endpoints.getPropertiesWithFilters;
        var data = {
            "search": search,
            "property_type": property_type,
            'subcategory': subCategoryID,
            "min_beds": minBed,
            "max_beds": maxBed,
            "min_price": minPrice,
            "max_price": maxPrice,
            "suburbs": suburbs,
            "limit": 2,
            "offset": offset
        }
        let newData = Object.assign(data, selectedFilters); // Merge 2 Objects

        var cleanerObject = await cleanObject(newData);

        Axios.post(searchURL, cleanerObject)
            .then((response) => {
                setLoadingButton(false);
                if (response.data.error === true) {
                    console.log('There are some errors!');
                } else {
                    setTotalResults(response.data.data.total)
                    setSearchResults(response.data.data.properties);
                }
            }).catch(() => {
                setLoadingButton(false);
            })
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        getSearchResults();
    }, [offset, selectedFilters]);



    return (
        <Fragment>
            <MetaTags>
                <title>Results for properties</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'Results for properties' }} />

            <Content
                propertyType={property_type}
                searchQuery={search}
                searchResults={searchResults}
                subCategoryName={subCategoryName}
                subCategoryID={subCategoryID}
                totalResults={totalResults}
                offset={offset}
                setOffset={setOffset}
                setSelectedFilters={setSelectedFilters}
                loadingButton={loadingButton}
            />
            <Footer />
        </Fragment>


    );
}

export default Propertyresults;