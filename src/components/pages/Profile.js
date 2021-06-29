import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/profile/Content';

class Profile extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>My Profile | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Profile;