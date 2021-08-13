import React from 'react';
import { Link } from 'react-router-dom';
import { convertToSlug } from "../../../helper/comman_helper";



const Content = ({ recentNews }) => {
    return (
        <div className="section bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)", padding: "0px" }}>
            <div className="container">
                <div className="section-404" style={{ padding: "50px" }}>
                    <div className="section-404-text mb-0">
                        <h3>Sorry, this News isn't available.</h3>
                        <p className="subtitle">The link you followed may be broken, or the property may have been removed. Go back to Nep Real Estate.</p>
                        <Link to="/home" className="btn-custom">Go back Home</Link>
                    </div>
                </div>
            </div>
            <div className="acr-clouds">
                <div className="cloud-one" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud1.png)" }} />
                <div className="cloud-two" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud2.png)" }} />
                <div className="cloud-three" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud3.png)" }} />
                <div className="cloud-four" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud4.png)" }} />
                <div className="cloud-five" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/cloud5.png)" }} />
            </div>

            <div className="section section-padding" style={{ padding: "0px" }}>
                <div className="container">

                    <div className="row">
                        <div className="section section-padding">
                            <h4>Related Posts</h4>
                            <div className="row">
                                {recentNews && recentNews.slice(0, 10).map((item, i) => (
                                    <div key={i} className="col-md-4">
                                        <article className="post single">
                                            <div className="post-thumbnail">
                                                <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>
                                                    <img
                                                        src={`/assets/img/blog/${item.image !== undefined ? item.image : ''}`}
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
                                                        <span className="post-date">{new Date(item.createdAt).toDateString()}</span>
                                                    </div>
                                                </div>
                                                <h5 className="post-title">
                                                    {" "}
                                                    <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>{item.title}</Link>{" "}
                                                </h5>
                                                <p className="post-text">{item.description.slice(0, 75)}</p>
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





                </div>
            </div>

        </div>
    );
}

export default Content;