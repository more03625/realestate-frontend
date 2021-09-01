import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { convertToSlug, uppercaseFirstLetter } from '../../../helper/comman_helper';
const Latestblog = ({ recentNews }) => {

    return (
        <div className="section section-padding light-bg">
            <div className="container">
                <div className="section-title-wrap section-header">
                    <h5 className="custom-primary">Latest News</h5>
                    <h2 className="title">Latest News in <span style={{ color: "rgb(0, 69, 146)" }}>{uppercaseFirstLetter(window.location.pathname.split("/")[1])}</span></h2>
                </div>
                <div className="row">
                    {
                        recentNews.slice(0, 4).map((value, index) => (
                            <div className="col-lg-6" key={index}>
                                <article className="post post-list">
                                    <div className="post-thumbnail" style={{ width: "100%", height: "186.25px" }}>
                                        <Link to={`/read/news/${convertToSlug(value.title)}/${value.id}`}>
                                            <img className="custom-images" src={process.env.REACT_APP_CONTENT_URL + value.image + ".jpg"} alt="blog post" />
                                        </Link>
                                    </div>


                                    <div className="post-body" style={{ height: "186.25px" }}>
                                        <h5 className="post-title">
                                            <Link to={`/read/news/${convertToSlug(value.title)}/${value.id}`}>{value.title.slice(0, 68) + "..."}</Link>
                                        </h5>
                                        <p className="post-text">
                                            {ReactHtmlParser(value.description.slice(0, 75) + "...")}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Latestblog;