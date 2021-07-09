import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../sections/blogsingle/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/newsdetails/Content";

class Blogsingle extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>RAHUL About this blog | Neprealestate</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Blogsingle;
