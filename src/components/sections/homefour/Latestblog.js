import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { convertToSlug, uppercaseFirstLetter, Host } from '../../../helper/comman_helper';
const Latestblog = ({ recentNews }) => {

    return (
        <div className="section section-padding light-bg">
            <div className="container">
                <div className="section-title-wrap section-header">
                    <h5 className="custom-primary">Latest News</h5>
                    <h2 className="title">Latest News</h2>
                </div>
                <div className="row">
                    {
                        recentNews.slice(0, 4).map((value, index) => (
                            <div className="col-lg-6" key={index}>
                                <article className="post post-list row">

                                    <div className="post-thumbnail col-lg-5 m-0 p-0 rounded-0" style={{ width: "100%", height: "186.25px" }}>
                                        <Link to={`/read/news/${convertToSlug(value.title)}/${value.id}`}>
                                            <img className="custom-images rounded-0" src={Host + value.image + ".jpg"} alt="blog post" />
                                        </Link>
                                    </div>


                                    <div className="post-body col-lg-7" style={{ height: "186.25px" }}>
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