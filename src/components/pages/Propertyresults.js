import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footerthree';
import Breadcrumb from '../layouts/Breadcrumb';
import Content from '../sections/property-results/Content';
import Axios from 'axios';
import { Endpoints, Host, cleanObject } from '../../helper/comman_helper';

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
    var defaultAreaUnit = queryParams.get("default_area_unit");
    var area = queryParams.get("area");

    const [searchResults, setSearchResults] = useState([]);
    const [totalResults, setTotalResults] = useState();
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(2)
    const [loadingButton, setLoadingButton] = useState(false);
    const [filterData, setFilterData] = useState({});
    const [runUseEffect, setRunUseEffect] = useState(false);

    var currentPath = window.location.pathname;

    console.log("Home filterData ===> ", filterData);

    const getSearchResults = async () => {
        setLoadingButton(true);
        var searchURL = Host + Endpoints.getPropertiesWithFilters;

        var homePageSearchData = {
            "search": search,
            "property_type": property_type,
            'subcategory': subCategoryID,
            "min_beds": minBed,
            "max_beds": maxBed,
            "min_price": minPrice,
            "max_price": maxPrice,
            "suburbs": suburbs,
            "default_area_unit": defaultAreaUnit,
            "area": area,
            "limit": limit,
            "offset": offset
        }

        var data = Object.assign(homePageSearchData, filterData);

        if (currentPath === '/commercial') {
            Object.assign(data, { category: 2 });
        }

        var cleanerObject = await cleanObject(data);

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
    }, [offset, runUseEffect]);

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
            {/*<Breadcrumb breadcrumb={{ pagename: currentPath === '/commercial' ? 'Commercial Properties' : 'Results for properties' }} />*/}

            <Content
                propertyType={property_type}
                searchQuery={search}
                searchResults={searchResults}
                subCategoryName={subCategoryName}
                subCategoryID={subCategoryID}
                totalResults={totalResults}
                limit={limit}
                setLimit={setLimit}
                offset={offset}
                setOffset={setOffset}
                loadingButton={loadingButton}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minBed={minBed}
                maxBed={maxBed}
                setFilterData={setFilterData}
                filterData={filterData}
                setRunUseEffect={setRunUseEffect}
                runUseEffect={runUseEffect}
            />

            <Footer />
        </Fragment>


    );
}

export default Propertyresults;