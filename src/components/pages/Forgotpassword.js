import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Content from '../sections/forgot-password/Content';

const Forgotpassword = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>Forgot password | Neprealestate</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <Header />
            <Content />
        </Fragment>
    );
}

export default Forgotpassword;