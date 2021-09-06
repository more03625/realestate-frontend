import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footerthree';
import Content from '../sections/homefour/Content';

const Homefour = () => {


    return (
        <Fragment>
            <MetaTags>
                <title>Homepage | Neprealestate </title>
                <meta
                    name="description"
                    content="Neprealestate.com"
                />
            </MetaTags>
            <Header />
            <Content />
            <Footer />
        </Fragment>
    );

}

export default Homefour;