import React, { Component, Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/agent-details/Content';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { cleanObject, Endpoints, errorToast, Host } from '../../helper/comman_helper';

const Agentdetails = () => {
    const { agentName, agentID } = useParams();

    const [agentData, setAgentData] = useState();
    const [agentProperties, setAgentProperties] = useState([]);
    const [agents, setAgents] = useState([]);
    // Pagination
    const [totalResults, setTotalResults] = useState();
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(2);

    const getUserById = async () => {
        var url = Host + Endpoints.getUserById + agentID;
        const result = await Axios.get(url);
        if (result.data.error === true) {
            errorToast(result.data.title);
        } else {
            setAgentData(result.data.data);
        }
    }
    const getPropertiesBySellerID = async () => {
        var url = Host + Endpoints.getPropertiesBySellerID;
        var data = {
            id: agentID,
            limit: limit,
            offset: offset
        }
        const result = await Axios.post(url, cleanObject(data));
        if (result.data.error === true) {
            errorToast(result.data.title)
        } else {
            setTotalResults(result.data.data.total);
            setAgentProperties(result.data.data.users);
        }
    }

    const getAgents = async () => {
        var url = Host + Endpoints.agentList;
        var result = await Axios.post(url);
        if (result.data.error === true) {
            console.log('There are some erros!');
        } else {
            setAgents(result.data.data.users);
        }
    }
    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
        getPropertiesBySellerID();
    }, [offset])

    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
        getUserById();
        getAgents();
    }, [agentID]);

    return (
        <Fragment>
            <MetaTags>
                <title>Agent Details | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>

            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'Agent Details' }} />
            <Content
                agentData={agentData}
                agentProperties={agentProperties}
                similarAgents={agents}
                totalResults={totalResults}
                setOffset={setOffset}
                offset={offset}
                limit={limit}
            />
            <Footer />
        </Fragment>
    );
}

export default Agentdetails;