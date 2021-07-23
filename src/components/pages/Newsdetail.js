import React, { useEffect, Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../sections/blogsingle/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/blogsingle/Content";
import { Link, useParams } from "react-router-dom";
import { Host, Endpoints } from "../../helper/comman_helper";
import Axios from "axios";
const Newsdetail = () => {
  const { slug, newsID } = useParams();

  const getNewsDetails = () => {
    var url = Host + Endpoints.getNewsDetails + newsID;
    Axios.get(url).then((response) => {
      if (response.data.error === false) {
        setDetailedNews(response.data.data);
      } else {
        setDetailedNewsError(response.data.title);
      }
    });
  };
  useEffect(() => {
    getNewsDetails();
  }, []);
  const [detailedNewsError, setDetailedNewsError] = useState();
  const [detailedNews, setDetailedNews] = useState();

  return (
    <Fragment>
      <MetaTags>
        <title>
          {detailedNews && detailedNews.title ? detailedNews.title : ""}
        </title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumb
        breadcrumb={{ pagename: "News details" }}
        newsData={detailedNews}
      />
      <Content newsData={detailedNews} />
      <Footer />
    </Fragment>
  );
};

export default Newsdetail;
