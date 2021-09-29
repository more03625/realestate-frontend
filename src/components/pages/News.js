import React, { useEffect, useState, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/news/Content";
import { useParams } from "react-router";
import { Host, Endpoints } from "../../helper/comman_helper";
import Axios from "axios";
const News = () => {
  const [recentNews, setRecentNews] = useState([]);

  function getRecentNews() {
    var url = Host + Endpoints.getRecentNews;
    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === false) {
          setRecentNews(response.data.data); //object
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  useEffect(() => {
    getRecentNews();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Latest News | Neprealestate</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "News" }} />
      <Content recentNews={recentNews} />
      <Footer />
    </Fragment>
  );
};

export default News;
