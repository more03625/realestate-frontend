import React from 'react';
import { Link } from 'react-router-dom';
import { Host } from '../../helper/comman_helper';
const Userbreadcrumb = ({ userData, profileImage, isImageChanged }) => {
    return (
        <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-2.jpg)" }}>
            <div className="container">
                <div className="media">
                    <img
                        src={
                            isImageChanged === true ? profileImage :
                                userData && userData.profile_image != undefined ? Host + userData.profile_image + "_small.jpg" : Host + "/users/default.png"}
                        alt={userData && userData.profile_image != undefined ? Host + userData.profile_image + "_small.jpg" : Host + "/users/default.png"}
                    />
                    <div className="media-body">
                        <h3 className="text-white">{userData && userData.name !== undefined ? userData.name : ''}</h3>
                        <span className="user-email">{userData && userData.email !== undefined ? userData.email : ''}</span>
                    </div>
                    <Link to="/add-property" className="btn-custom secondary mr-0">Add Property <i className="fas mr-0 fa-plus" /> </Link>
                </div>
            </div>
        </div>
    );
}

export default Userbreadcrumb;