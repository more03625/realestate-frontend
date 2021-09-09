import React, { useState, useEffect, Fragment } from 'react';

import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/legal/Content';
import { Host, Endpoints, getUserToken } from "../../helper/comman_helper";
import Axios from "axios";
const Privacypolicy = () => {
    var slug = window.location.pathname.split("/")[1];

    const [setting, setSetting] = useState([]);
    const getSettingsBySlug = async () => {
        var url = Host + Endpoints.getSettingBySlug
        const result = await Axios.get(url, {
            params: {
                slug: slug
            }
        });
        console.log(result.data.data.settings[0]);
        if (result.data.error === false) {
            setSetting(result.data.data.settings[0]);
        }
    }
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getSettingsBySlug();
    }, [slug]);
    return (
        <Fragment>
            <MetaTags>
                <title>{setting.title} | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: setting.title }} />
            <Content setting={setting} />
            <Footer />
        </Fragment>
    );
}

export default Privacypolicy;