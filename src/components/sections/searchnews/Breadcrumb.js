import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ resultsData }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery().get("search_query");

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
          <h1 className="text-white">Search results for "{query}"</h1>
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
                results
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
