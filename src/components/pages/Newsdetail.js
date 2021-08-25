import React, { useEffect, Fragment, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../sections/blogsingle/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/blogsingle/Content";
import { Link, useParams } from "react-router-dom";
import { Host, Endpoints } from "../../helper/comman_helper";
import Axios from "axios";
import Loader from "../layouts/Loader";
import Error from '../pages/Error';
import NewsNotFound from "./NewsNotFound";
const Newsdetail = () => {
  const { slug, newsID } = useParams();
  const ref = useRef();
  const getNewsDetails = () => {
    var url = Host + Endpoints.getNewsDetails + newsID;
    Axios.get(url).then((response) => {
      if (response.data.error === false) {
        setDetailedNews(response.data.data);
      } else {
        setDetailedNews(false);
        setDetailedNewsError(response.data.title);
      }
    });
  };
  const [detailedNewsError, setDetailedNewsError] = useState();
  const [detailedNews, setDetailedNews] = useState();
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
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    getNewsDetails();
    getRecentNews();
  }, [newsID]);


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
      {
        detailedNews === false ? <NewsNotFound recentNews={recentNews} /> :
          <>

            <Content newsData={detailedNews} recentNews={recentNews} ref={ref} />

            <Footer />
          </>
      }
    </Fragment>

  );
};

export default Newsdetail;
