import React, { useState, useEffect, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/about/Content';
import { Host, Endpoints, getUserToken } from "../../helper/comman_helper";
import Axios from "axios";
const About = () => {
    var slug = window.location.pathname.split("/")[1];
    const [setting, setSetting] = useState([]);
    const getSettingsBySlug = async () => {
        var url = Host + Endpoints.getSettingBySlug
        const result = await Axios.get(url, {
            params: {
                slug: slug
            }
        }, {
            headers: {
                // token: getUserToken().token
            }
        });
        console.log(result.data.data.settings[0]);
        if (result.data.error === false) {
            setSetting(result.data.data.settings[0]);
        }
    }
    useEffect(() => {
        getSettingsBySlug();
    }, []);
    return (
        <Fragment>
            <MetaTags>
                <title>About Us | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'About Us' }} />
            <Content setting={setting} />
            <Footer />
        </Fragment>
    );
}

export default About;