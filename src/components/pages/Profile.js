import React, { useEffect, useState, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/profile/Content';
import { getUserToken } from '../../helper/comman_helper';
import Axios from 'axios';
import { Host, Endpoints } from '../../helper/comman_helper';
const Profile = () => {
    const [userData, setUserData] = useState([]);


    const getUser = async () => {
        //write function here & get this data from DB
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
                <title>My Profile | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb userData={userData} />
            <Content />
            <Footer />
        </Fragment>
    );
}

export default Profile;