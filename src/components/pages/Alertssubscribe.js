import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Footer from '../layouts/Footerthree';
import Breadcrumb from '../layouts/Breadcrumb';
import Content from '../sections/alerts-subscribe/Content';
import Axios from 'axios';
import { Endpoints, Host } from '../../helper/comman_helper';

const Alertssubscribe = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>Subscribe for alerts</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: "Subscribe for alerts" }} />
            <Content />
            <Footer />
        </Fragment>

    );
}

export default Alertssubscribe;