import React, { Component, Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/agent-archive/Content';
import Axios from 'axios';
import { Endpoints, Host, cleanObject } from '../../helper/comman_helper';
const Agentarchive = () => {
    const queryParams = new URLSearchParams(window.location.search);
    var search = queryParams.get("search");
    console.log("Search Query ===> ", search);
    const [agents, setAgents] = useState([]);
    const [recentProperties, setRecentProperties] = useState([]);
    const [subCategoriesWithCount, setSubCategoriesWithCount] = useState([]);
    // Pagination
    const [totalResults, setTotalResults] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(2);


    const getAgents = async () => {
        var url = Host + Endpoints.agentList;
        var data = {
            search: search,
            limit: limit,
            offset: offset
        }
        var result = await Axios.post(url, cleanObject(data));
        if (result.data.error === true) {
            console.log('There are some erros!');
        } else {
            setTotalResults(result.data.data.total);
            setAgents(result.data.data.users);
        }
    }

    const getRecentProperties = async () => {
        var url = Host + Endpoints.getRecentProperties;
        const response = await Axios.get(url);
        if (response.data.error === true) {
            alert(response.data.title);
        } else {
            setRecentProperties(response.data.data);
        }
    };
    const getSubCategories = async () => {
        var url = Host + Endpoints.getPropertyCounts;
        const response = await Axios.get(url);
        if (response.data.error === true) {
            alert("There are some errors!")
        } else {
            setSubCategoriesWithCount(response.data.data);
        }
    }
    console.log("offset ===> ", offset)
    useEffect(() => {
        getAgents();
    }, [offset]);

    useEffect(() => {
        getRecentProperties();
        getSubCategories();
    }, [])
    return (
        <Fragment>
            <MetaTags>
                <title>Find agents| Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'Find agents' }} />
            <Content
                agents={agents}
                recentProperties={recentProperties}
                subCategoriesWithCount={subCategoriesWithCount}
                setOffset={setOffset}
                offset={offset}
                limit={limit}
                totalResults={totalResults}
            />
            <Footer />
        </Fragment>
    );
}

export default Agentarchive;