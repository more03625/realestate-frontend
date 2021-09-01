import React, { useEffect, Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../layouts/Blogsidebar";
import { blogblock, blogcomment } from "../../../data/blog.json";
import $ from "jquery";
import "magnific-popup";
import axios from "axios";
import { convertToSlug } from "../../../helper/comman_helper";
import ContentNotFound from "../../pages/ContentNotFound";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const Content = ({ newsData, recentNews }) => {
  console.log();
  const { slug, newsID } = useParams();

  return (
    <div className="section blog-wrapper">
      {
        <div className="container">
          <div className="row">
            {/* Post Start */}
            <div className="col-lg-8">
              {/* Content Start */}
              <article className="post-single">
                <div className="post-thumbnail">
                  <img
                    src={
                      newsData && newsData.image != null
                        ? process.env.REACT_APP_CONTENT_URL +
                        newsData.image +
                        ".jpg"
                        : process.env.REACT_APP_CONTENT_URL +
                        "/users/default.png"
                    }
                    alt={`image of ${newsData && newsData.title}`}
                  />
                </div>
                <div className="post-content">
                  {ReactHtmlParser(
                    newsData && newsData.description !== undefined
                      ? newsData.description
                      : "Loading..."
                  )}
                </div>
              </article>
              <div className="section section-padding">
                <h4>Related Posts</h4>
                <div className="row">
                  {recentNews &&
                    recentNews.slice(0, 10).map((item, i) => (
                      <div key={i} className="col-md-6">
                        <article className="post single">
                          <div className="post-thumbnail">
                            <Link
                              to={`/read/news/${convertToSlug(item.title)}/${item.id
                                }`}
                            >
                              <img
                                src={
                                  item.image != null
                                    ? process.env.REACT_APP_CONTENT_URL +
                                    item.image +
                                    ".jpg"
                                    : process.env.REACT_APP_CONTENT_URL +
                                    "/users/default.png"
                                }
                                alt={`image of ${item.title}`}
                              />
                            </Link>
                          </div>
                          <div className="post-body">
                            <div className="post-author">
                              <img
                                src={
                                  process.env.REACT_APP_CONTENT_URL +
                                  item.profile_image +
                                  "_small.jpg"
                                }
                                alt={item.profile_image + "_small.jpg"}
                              />
                              <div className="post-author-body">
                                <p>
                                  {" "}
                                  <Link to="#">{item.name}</Link>{" "}
                                </p>
                                <span className="post-date">
                                  {new Date(item.createdAt).toDateString()}
                                </span>
                              </div>
                            </div>
                            <h5 className="post-title">
                              {" "}
                              <Link
                                to={`/read/news/${convertToSlug(item.title)}/${item.id
                                  }`}
                              >
                                {item.title.slice(0, 30) + "..."}
                              </Link>{" "}
                            </h5>
                            <p className="post-text">
                              {item.description
                                .slice(0, 75)
                                .replace(/(<([^>]+)>)/gi, "")}
                            </p>
                            <div className="post-controls">
                              <Link
                                to={`/read/news/${convertToSlug(item.title)}/${item.id
                                  }`}
                                className="btn-custom secondary btn-sm"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                </div>
                {/*row ends*/}
              </div>
              {/*section section-padding*/}

            </div>
            {/* Post End */}
            {/* Sidebar Start */}
            <div className="col-lg-4">
              <Sidebar recentNews={recentNews} />
            </div>
            {/* Sidebar End */}
          </div>

        </div>
      }
    </div>
  );
};

export default Content;
