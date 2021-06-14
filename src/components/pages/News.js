import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footerthree';
import Content from '../sections/news/Content';

class News extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Latest News | Neprealestate</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'News'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default News;