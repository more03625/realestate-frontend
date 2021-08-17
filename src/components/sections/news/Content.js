import React, { Component, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogblock } from "../../../data/blog.json";
import Sidebar from "../../layouts/Blogsidebar";
import classNames from "classnames";
import Loader from "../../layouts/Loader";
import { Host, Endpoints, convertToSlug } from "../../../helper/comman_helper";
import Axios from "axios";

const Content = ({ recentNews }) => {
  function getNews() {
    var url = Host + Endpoints.getNews;
    Axios.post(url)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === false) {
          setItems(response.data.data); //object
        } else {
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  useEffect(() => {
    getNews();
  }, []);
  const [items, setItems] = useState([]);
  console.log(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    var paginationContent = event.target.closest(".pagination-content");

    if (paginationContent) {
      console.log(paginationContent);
      paginationContent.scrollIntoView();
    }

    setLoading(true);

    setTimeout(() => {
      setCurrentPage(Number(event.target.getAttribute("data-page")));
      setLoading(false);
    }, 2000);
  };
  //   handleClick = handleClick.bind(this);

  // Logic for displaying items
  const indexOfLastitem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastitem - itemsPerPage;
  const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);

  const renderitems = currentitems && currentitems.map((item, i) => {
    return (
      <article key={i} className="post">
        <div className="post-thumbnail">
          <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>
            <img src={item.image != null ? process.env.REACT_APP_CONTENT_URL + item.image + ".jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
              alt={`image of ${item.title}`}
            />
          </Link>
        </div>
        <div className="post-body">
          <div className="post-author">
            <img src={item.profile_image != null ? process.env.REACT_APP_CONTENT_URL + item.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
              alt={item.profile_image + "_small.jpg"}
            />

            <div className="post-author-body">
              <p>
                {" "}
                <Link to="#">{item.name}</Link>{" "}
              </p>

              <span className="post-date">{new Date(item.createdAt).toDateString()}</span>
            </div>
          </div>
          <h5 className="post-title">
            {" "}
            <Link to={`/read/news/${convertToSlug(item.title)}/${item.id}`}>
              {item.title}
            </Link>{" "}
          </h5>
          <p className="post-text">{item.text}</p>
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
    );
  });

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPagination = pageNumbers.map((number) => {
    const activeCondition = currentPage === number ? "active" : "";
    return (
      <Fragment key={number}>
        {pageNumbers.length > 1 ? (
          <li className={classNames("page-item", { active: activeCondition })}>
            <Link
              className="page-link"
              to="#"
              data-page={number}
              onClick={handleClick}
            >
              {number}
            </Link>
          </li>
        ) : (
          ""
        )}
      </Fragment>
    );
  });
  return (
    <div className="section posts pagination-content">
      <div className="container">
        <div className="row">
          {/* Posts Start */}
          <div className="col-lg-8">
            {/* Post Start */}
            {loading === false ? renderitems : <Loader />}
            {/* Post End */}
            {/* Pagination Start */}
            {pageNumbers.length > 1 ? (
              <ul className="pagination">
                {/* Prev */}
                {/* to show previous, we need to be on the 2nd or more page */}
                {pageNumbers.length > 1 && currentPage !== 1 ? (
                  <li className="page-item">
                    <Link
                      className="page-link"
                      to="#"
                      data-page={currentPage - 1}
                      onClick={handleClick}
                    >
                      <i className="fas fa-chevron-left" />
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {/* Prev */}
                {renderPagination}
                {/* Next */}
                {/* to show next, we should not be on the last page */}
                {pageNumbers.length > 1 &&
                  currentPage !== pageNumbers.length ? (
                  <li className="page-item">
                    <Link
                      className="page-link"
                      to="#"
                      data-page={parseInt(currentPage + 1)}
                      onClick={handleClick}
                    >
                      <i className="fas fa-chevron-right" />
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {/* Next */}
              </ul>
            ) : (
              ""
            )}
            {/* Pagination End */}
          </div>
          {/* Posts End */}
          {/* Sidebar Start */}
          <div className="col-lg-4">
            <Sidebar recentNews={recentNews} />
          </div>
          {/* Sidebar End */}
        </div>
      </div>
    </div>
  );
};

export default Content;
