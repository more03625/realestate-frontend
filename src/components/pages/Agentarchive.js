import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/agent-archive/Content';

class Agentarchive extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Acres - Real Estate React Template | Agent Archive</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Agent Archive'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Agentarchive;