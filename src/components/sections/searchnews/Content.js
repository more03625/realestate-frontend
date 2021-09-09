import React, { useEffect, Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../layouts/Blogsidebar";
import { blogblock, blogcomment } from "../../../data/blog.json";
import $ from "jquery";
import "magnific-popup";
import axios from "axios";
import { Endpoints, Host, convertToSlug } from "../../../helper/comman_helper";

const Content = ({ resultsData }) => {
  var searchedArray = [];

  for (const key in resultsData) {
    searchedArray.push(resultsData[key]);
  }
  console.log(searchedArray);
  return (
    <div className="section blog-wrapper">
      <div className="container">
        <div className="row">
          {/* Post Start */}
          <div className="col-lg-8">
            {/* Content Start */}

            <div className="section section-padding">
              <h4>Search News Related Posts</h4>
              <div className="row">
                {searchedArray && searchedArray.map((item, i) => (
                  <div key={i} className="col-md-6">
                    <article className="post single">
                      <div className="post-thumbnail">
                        <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>
                          <img src={item.image != null ? Host + item.image + ".jpg" : Host + "/users/default.png"}
                            alt={`image of ${item.title}`}
                          />

                        </Link>
                      </div>
                      <div className="post-body">
                        <div className="post-author">
                          <img
                            src={
                              Host + item.profile_image +
                              "_small.jpg"
                            }
                            alt={item.profile_image + "_small.jpg"}
                          />
                          <div className="post-author-body">
                            <p>
                              {" "}
                              <Link to="#">{item.name}</Link>{" "}
                            </p>
                            <span className="post-date">{new Date(item.createdAt).toDateString()}</span>
                          </div>
                        </div>
                        <h5 className="post-title">
                          {" "}
                          <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>{item.title.slice(0, 30) + "..."}</Link>{" "}
                        </h5>
                        <p className="post-text">{item.description.slice(0, 75).replace(/(<([^>]+)>)/gi, "")}</p>
                        <div className="post-controls">
                          <Link
                            to={`/read/news/${convertToSlug(item.title)}/${item.id}`}
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
            </div>

          </div>
          {/* Post End */}
          {/* Sidebar Start */}
          <div className="col-lg-4">
            <Sidebar />
          </div>
          {/* Sidebar End */}
        </div>
      </div>
    </div>
  );
};

export default Content;
