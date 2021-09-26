import React from "react";
import { Link } from "react-router-dom";
import { convertToSlug } from "./../../helper/comman_helper";
import { Host } from "./../../helper/comman_helper";
const Blogsidebar = ({ recentNews }) => {
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

        {recentNews > 0 ? recentNews.slice(0, 4).map((item, i) => (
          <article key={i} className="media">
            <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>
              <img src={item.image != null ? Host + item.image + ".jpg" : Host + "/users/default.png"}
                alt={`image of ${item.title}`}
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
        )) : ('There are no related posts!')}
      </div>
    </div>
  );
};

export default Blogsidebar;
