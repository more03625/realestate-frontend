import React, { useEffect, Fragment, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
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
  const [detailedNewsError, setDetailedNewsError] = useState();
  const [detailedNews, setDetailedNews] = useState();
  const [recentNews, setRecentNews] = useState([]);

  const getNewsDetails = async () => {
    var url = Host + Endpoints.getNewsDetails + newsID;
    const response = await Axios.get(url);

    if (response.data.error === false) {
      setDetailedNews(response.data.data);

      var recentNewsURL = Host + Endpoints.getRecentNews + "?id=" + newsID + "&type=" + response.data.data.type;
      const result = await Axios.get(recentNewsURL)
      if (result.data.error === false) {
        setRecentNews(result.data.data); //object
      }


    } else {
      setDetailedNews(false);
      setDetailedNewsError(response.data.title);
    }

  };



  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    getNewsDetails();
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
