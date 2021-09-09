import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footerthree';
import Breadcrumb from '../layouts/Breadcrumb';
import Content from '../sections/alerts-subscribe/Content';

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