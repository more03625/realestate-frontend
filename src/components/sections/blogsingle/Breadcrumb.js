import React, { Component } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ resultsData }) => {
  var key,
    count = 0;
  for (key in resultsData) {
    if (resultsData.hasOwnProperty(key)) count++;
  }

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
          <h1 className="text-white">Search results for</h1>
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
                {resultsData && resultsData.title !== undefined
                  ? resultsData.title
                  : "Loading..."}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
