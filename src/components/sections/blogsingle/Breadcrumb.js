import React, { Component } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ newsData }) => {
  console.log(newsData);

  return (
    <div
      className="subheader subheader-2 bg-cover bg-center dark-overlay"
      style={{
        backgroundImage:
          "url(" + process.env.PUBLIC_URL + "/assets/img/subheader.jpg)",
      }}
    >
      <div className="container">
        <div className="subheader-inner">
          <h3 className="text-white">
            {newsData && newsData.title !== undefined
              ? newsData.title
              : ""}
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">
                  {" "}
                  <i className="fas fa-home" />{" "}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">News</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {newsData && newsData.title !== undefined
                  ? newsData.title
                  : ""}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
