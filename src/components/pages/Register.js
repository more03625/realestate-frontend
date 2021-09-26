import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Content from '../sections/register/Content';

const Register = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>Register | Neprealestate</title>
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

export default Register;