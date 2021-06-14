import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Content from '../sections/forgot-password/Content';

class Forgotpassword extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Forgot password | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Forgotpassword;