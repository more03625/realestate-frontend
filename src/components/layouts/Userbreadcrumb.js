import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserToken } from '../../helper/comman_helper';
const Userbreadcrumb = () => {
    return (
        <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-2.jpg)" }}>
            <div className="container">
                <div className="media">
                    <img
                        src={getUserToken().data.profile_image != null ? process.env.REACT_APP_CONTENT_URL + getUserToken().data.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                        alt={getUserToken().data.profile_image + "_small.jpg"}
                    />
                    <div className="media-body">
                        <h3 className="text-white">{getUserToken().data.name}</h3>
                        <span className="user-email">{getUserToken().data.email}</span>
                    </div>
                    <Link to="/add-property" className="btn-custom secondary mr-0">Submit Listing <i className="fas mr-0 fa-plus" /> </Link>
                </div>
            </div>
        </div>
    );
}

export default Userbreadcrumb;