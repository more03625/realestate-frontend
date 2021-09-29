import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Content from '../sections/login/Content';
import Footer from '../layouts/Footerthree';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Login | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Login;