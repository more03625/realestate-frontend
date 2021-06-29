import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/legal/Content';

class Privacypolicy extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Privacy policy | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Privacy policy'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Privacypolicy;