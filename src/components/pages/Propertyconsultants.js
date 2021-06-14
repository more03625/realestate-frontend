import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/agent-archive/Content';

class Propertyconsultants extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Property Consultants | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Property Consultants'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Propertyconsultants;