import React, { Component, Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/agent-details/Content';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Endpoints, Host } from '../../helper/comman_helper';

const Agentdetails = () => {
    const { agentName, agentID } = useParams();

    const [agentData, setAgentData] = useState();
    const [agentProperties, setAgentProperties] = useState([]);
    const [agents, setAgents] = useState([]);

    const getUserById = async () => {
        var url = Host + Endpoints.getUserById + agentID;
        const result = await Axios.get(url);
        setAgentData(result.data.data);
    }
    const getPropertiesBySellerID = async () => {
        var url = Host + Endpoints.getPropertiesBySellerID;
        var data = {
            id: agentID
        }
        const result = await Axios.post(url, data);
        setAgentProperties(result.data.data.users);
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
        window.scrollTo(0, 0);
        getUserById();
        getPropertiesBySellerID();
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
            <Content agentData={agentData} agentProperties={agentProperties} similarAgents={agents} />
            <Footer />
        </Fragment>
    );
}

export default Agentdetails;