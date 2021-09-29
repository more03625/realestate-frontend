import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/icons/Content";

class Icons extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Icons| Neprealestate</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Terms & conditions" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Icons;
