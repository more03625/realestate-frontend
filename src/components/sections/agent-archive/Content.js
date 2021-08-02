import React, { Component, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import listing from '../../../data/listings.json';
import { blogcategory } from '../../../data/blog.json';
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
import { convertToSlug } from '../../../helper/comman_helper';
import { Noresults } from '../../layouts/Noresults';
const Content = ({ agents, recentProperties, subCategoriesWithCount }) => {
    const [items, setItems] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);


    const handleClick = (event) => {
        var paginationContent = event.target.closest('.pagination-content');

        if (paginationContent) {
            paginationContent.scrollIntoView();
        }


        setLoading(true);

        setTimeout(() => {
            setCurrentPage(Number(event.target.getAttribute('data-page')));
            setLoading(false);
        }, 2000);
    }

    // Logic for displaying items
    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;
    const currentitems = agents && agents.slice(indexOfFirstitem, indexOfLastitem);
    console.log(currentitems)
    const renderitems = currentitems.length > 0 ? (
        currentitems.map((item, i) => {
            var url = "agent" + "/" + convertToSlug(item.name) + "/" + item.id;

            return <div key={i} className="col-lg-6">
                <div className="acr-agent">
                    <div className="acr-dots-wrapper acr-agent-thumb">
                        <div className="acr-dots" />
                        <Link to={{ pathname: url }}><img className="agentsProfileArea" src={item && item.profile_image ? process.env.REACT_APP_CONTENT_URL + item.profile_image + ".jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"} alt="agent" /></Link>
                    </div>
                    <div className="acr-agent-body">
                        <h6> <Link to={{ pathname: url }}>{item.name}</Link> </h6>
                        <span>{item.post}</span>
                        <p>{item.about_me}</p>
                        <Link to={{ pathname: url }} className="btn-custom secondary btn-sm">View Profile</Link>
                    </div>
                </div>
            </div>
        })
    ) : (
        <Noresults />
    )

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(agents && agents.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPagination = pageNumbers.map(number => {
        const activeCondition = currentPage === number ? 'active' : ''
        return (
            <Fragment key={number}>
                {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                    <Link className="page-link" to="#" data-page={number} onClick={handleClick}>{number}</Link>
                </li> : ''}
            </Fragment>
        );
    });
    return (
        <div className="section pagination-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar">
                            <div className="sidebar-widget">
                                <h5>Recent Listings</h5>
                                {/* Listing Start */}
                                {recentProperties.slice(0, 4).map((item, i) => (
                                    <div key={i} className="listing listing-list">
                                        <div className="listing-thumbnail">
                                            <Link to={`property/${convertToSlug(item.title)}/${item.id}`}>
                                                <img
                                                    src={
                                                        process.env.REACT_APP_CONTENT_URL + item.image +
                                                        "_small.jpg"
                                                    }
                                                    alt={item.image + "_small.jpg"}
                                                    style={{ width: "130px", height: "86px" }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="listing-body">
                                            <h6 className="listing-title">
                                                <Link to={`property/${convertToSlug(item.title)}/${item.id}`} title={item.title} >
                                                    {item.title}
                                                </Link>{" "}
                                            </h6>a
                                            <span className="listing-price">Rs. {new Number(item.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                                {/* Listing End */}
                            </div>
                            <div className="sidebar-widget sidebar-list">
                                <h5>Popular Categories</h5>
                                <ul>
                                    {subCategoriesWithCount.map((item, i) => (
                                        <li key={i}>

                                            <Link to={`/property-results?sub_category=${item.name.toLowerCase()}&subcategory_id=${item.id}`}> {item.name} <span>({item.count})</span>
                                                <i className="fas fa-chevron-right" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            {/* Agent Start */}
                            {loading === false ? renderitems : <Loader />}
                            {/* Agent End */}
                        </div>
                        {/* Pagination Start */}
                        {pageNumbers.length > 1 ?
                            <ul className="pagination">
                                {/* Prev */}
                                {/* to show previous, we need to be on the 2nd or more page */}
                                {pageNumbers.length > 1 && currentPage !== 1 ?
                                    <li className="page-item">
                                        <Link className="page-link" to="#" data-page={currentPage - 1} onClick={handleClick}>
                                            <i className="fas fa-chevron-left" />
                                        </Link>
                                    </li>
                                    : ''}
                                {/* Prev */}
                                {renderPagination}
                                {/* Next */}
                                {/* to show next, we should not be on the last page */}
                                {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? <li className="page-item">
                                    <Link className="page-link" to="#" data-page={parseInt(currentPage + 1)} onClick={handleClick}>
                                        <i className="fas fa-chevron-right" />
                                    </Link>
                                </li>
                                    : ''}
                                {/* Next */}
                            </ul> : ''}
                        {/* Pagination End */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Content;