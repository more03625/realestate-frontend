import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Content from "../sections/forgot-password/ResetContent";
const ResetPassword = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Reset password | Neprealestate</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Content />
    </Fragment>
  );
}

export default ResetPassword;