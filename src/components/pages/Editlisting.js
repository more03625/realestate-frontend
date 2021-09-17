import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/edit-listing/EditContent';
import { useParams } from 'react-router-dom';

const Editlisting = () => {
    const { propertyID } = useParams();

    return (
        <Fragment>
            <MetaTags>
                <title>{propertyID > 0 ? 'Edit Property' : 'Add Property'} | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: propertyID > 0 ? 'Edit Property' : 'Add Property' }} />
            <Content />
            <Footer />
        </Fragment>
    );
}

export default Editlisting;