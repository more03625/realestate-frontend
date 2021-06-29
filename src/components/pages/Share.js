import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/listinglist/Content';

class Listinglist extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Sharing properties| Neprealestate </title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Sharing properties'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Listinglist;