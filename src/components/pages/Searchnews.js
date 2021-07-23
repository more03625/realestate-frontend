import React, { useEffect, Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Breadcrumb from "../sections/searchnews/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/searchnews/Content";
import { Link, useParams, useLocation } from "react-router-dom";
import { Host, Endpoints } from "../../helper/comman_helper.js";
import Axios from "axios";
const Searchnews = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery().get("search_query");

  const getResults = () => {
    var url = Host + Endpoints.getNews;
    var data = {
      search: query,
    };
    Axios.post(url, data).then((response) => {
      if (response.data.error === false) {
        setNewsResults(response.data.data);
      } else {
        setNewsResultsError(response.data.title);
      }
    });
  };
  useEffect(() => {
    getResults();
  }, []);
  const [newsResults, setNewsResults] = useState([]);
  const [newsResultsError, setNewsResultsError] = useState();

  return (
    <Fragment>
      <MetaTags>
        <title>{`Search results for ${query}`}</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumb resultsData={newsResults} />
      <Content resultsData={newsResults} />
      <Footer />
    </Fragment>
  );
};

export default Searchnews;
