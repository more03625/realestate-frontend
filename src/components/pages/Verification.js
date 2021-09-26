import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Content from "../sections/verification/Content";

const Verification = ({ location }) => {
  const userData = {
    email: location.state.email,
    mobile: location.state.mobile,
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Verification | Neprealestate</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Content userData={userData} />{" "}
      {/*send data in KEY & VALUE form. USE KEY in Next Component*/}
    </Fragment>
  );
};

export default Verification;
