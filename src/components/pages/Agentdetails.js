import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/agent-details/Content';

class Agentdetails extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Agent Details | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Agent Details'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Agentdetails;