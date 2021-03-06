import React, { useState, useEffect, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/profile-listings/Content';
import { Endpoints, Host, getUserToken } from "../../helper/comman_helper";
import Axios from "axios";

const Profilelistings = () => {
    const [userData, setUserData] = useState([]);
    const getUser = async () => {
        var url = Host + Endpoints.getProfileDetails;
        var result = await Axios.get(url, {
            headers: {
                token: getUserToken().token
            }
        });
        setUserData(result.data.data);
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Fragment>
            <MetaTags>
                <title>My Listings | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb userData={userData} />
            <Content userData={userData} />
            <Footer />
        </Fragment>
    );
}

export default Profilelistings;