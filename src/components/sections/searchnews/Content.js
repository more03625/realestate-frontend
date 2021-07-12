import React, { useEffect, Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../layouts/Blogsidebar";
import { blogblock, blogcomment } from "../../../data/blog.json";
import $ from "jquery";
import "magnific-popup";
import axios from "axios";
import { Endpoints, Host } from "../../../helper/server";

const Content = ({ resultsData }) => {
  console.log(resultsData.entries());
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
                {resultsData.map((item, i) => (
                  <div key={i} className="col-md-6">
                    <article className="post single">
                      <div className="post-thumbnail">
                        <Link to="/blog-single">
                          <img
                            src={process.env.PUBLIC_URL + "/" + item.gridimg}
                            alt="blog post"
                          />
                        </Link>
                      </div>
                      <div className="post-body">
                        <div className="post-author">
                          <img
                            src={process.env.PUBLIC_URL + "/" + item.authorimg}
                            alt="author"
                          />
                          <div className="post-author-body">
                            <p>
                              {" "}
                              <Link to="#">{item.authorname}</Link>{" "}
                            </p>
                            <span className="post-date">{item.postdate}</span>
                          </div>
                        </div>
                        <h5 className="post-title">
                          {" "}
                          <Link to="/blog-single">{item.title}</Link>{" "}
                        </h5>
                        <p className="post-text">{item.text.slice(0, 75)}</p>
                        <div className="post-controls">
                          <Link
                            to="/blog-single"
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
            {/* Related Posts End */}
            {/* Comments Start */}
            {/* <div className="comments-list section pt-0">
                                <h4>2 Comments</h4>
                                <ul>
                                    {blogcomment.map((item, i) => (
                                        <li key={i} className="comment-item">
                                            <img src={process.env.PUBLIC_URL + "/" + item.userimg} alt="comment author" />
                                            <div className="comment-body">
                                                <h5>{item.username}</h5>
                                                <span>Posted on: {item.commentdate}</span>
                                                <p>{item.comment}</p>
                                                <Link to="#" className="reply-link"> Reply </Link>
                                            </div>
                                            <ul>
                                                {item.replies.map((item, i) => (
                                                    <li key={i} className="comment-item">
                                                        <img src={process.env.PUBLIC_URL + "/" + item.userimg} alt="comment author" />
                                                        <div className="comment-body">
                                                            <h5>{item.username}</h5>
                                                            <span>Posted on: {item.commentdate}</span>
                                                            <p>{item.comment}</p>
                                                            <Link to="#" className="reply-link"> Reply </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
            {/* <div className="comment-form section p-0">
                                <h4>Leave a Reply</h4>
                                <form method="post">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>Full Name</label>
                                            <input type="text" className="form-control" placeholder="Full Name" name="fname" />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Email Address</label>
                                            <input type="email" className="form-control" placeholder="Email Address" name="email" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <label>Your Message</label>
                                            <textarea className="form-control" placeholder="Type your comment..." name="comment" rows={7} />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="sendNotifications" />
                                                <label className="custom-control-label fw-400" htmlFor="sendNotifications">Notify me when I receive a reply to my comment</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-custom primary" name="button">Post comment</button>
                                </form>
                            </div> */}
            {/* Comments End */}
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
