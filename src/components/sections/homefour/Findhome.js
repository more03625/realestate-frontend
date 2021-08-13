import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { type } from '../../../data/category.json'

const Findhome = ({ categories }) => {
    return (
        <div className="section cta-banner" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/cta/1.jpg )" }}>
            <div className="container">
                <div className="cta cta-3">
                    <div className="row">
                        <div className="col-lg-6 mb-lg-30">
                            <div className="section-title-wrap">
                                <h5 className="custom-primary">Find a Home</h5>
                                <h2 className="title">Build Your Family</h2>
                                <p className="subtitle">
                                    Find your place with an immersive photo experience and the most listing, including things you
                                    won’t find anywhere else.
                                </p>
                                <Link to="/property-results?property_type=buy" className="btn-custom">Browse Listings</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 infographics-4">
                            <div className="row">
                                {categories && categories.slice(0, 4).map((item, i) => (
                                    <div key={i} className="col-md-6">
                                        <div className="acr-infographic-item">
                                            <i className={`flaticon-home`} />
                                            {/*<img className="propertyDetailsOtherDetails text-center" src={process.env.REACT_APP_CONTENT_URL + item.image + ".jpg"} />*/}

                                            <div className="acr-infographic-item-body">
                                                <Link to={`property-results?sub_category=${item.name}&subcategory_id=${item.id}`}><h5 className="linkstyle">{item.name}</h5></Link>
                                                <p>{item.description.slice(0, 55) + "..."}</p>
                                            </div>
                                        </div>
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

export default Findhome;