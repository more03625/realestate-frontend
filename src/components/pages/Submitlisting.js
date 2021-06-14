import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/submit-listing/Content';

class Submitlisting extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Add Property | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Submit Listing'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Submitlisting;