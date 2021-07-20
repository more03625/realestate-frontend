import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogblock, blogcategory } from "../../data/blog.json";
import Axios from "axios";
import { Host, Endpoints, convertToSlug } from "./../../helper/server.js";

const Blogsidebar = () => {
  const [recentNews, setRecentNews] = useState([]);

  function getRecentNews() {
    var url = Host + Endpoints.getRecentNews;
    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === false) {
          setRecentNews(response.data.data); //object
        } else {
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
    <div className="sidebar">
      <div className="sidebar-widget">
        <form method="get" action="/results">
          <h5>Search News</h5>
          <div className="search-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              name="search_query"
            />
            <button type="submit" className="btn-custom">
              <i className="flaticon-search" />
            </button>
          </div>
        </form>
      </div>
      <div className="sidebar-widget">
        <h5>Recent News</h5>

        {recentNews.slice(0, 4).map((item, i) => (
          <article key={i} className="media">
            <Link to="/blog-single">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/" + item.image}
                alt="post"
              />
            </Link>
            <div className="media-body">
              <h6>
                {" "}
                <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>
                  {item.title.slice(0, 55) + "..."}
                </Link>{" "}
              </h6>
              <span>{new Date(item.createdAt).toDateString()}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogsidebar;
