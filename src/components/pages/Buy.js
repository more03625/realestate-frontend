import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/listinglist/Content';

class Buy extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Buy Properties| Neprealestate </title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Buy Properties'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Buy;