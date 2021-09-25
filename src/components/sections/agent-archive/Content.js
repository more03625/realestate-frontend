import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
import { convertToSlug, Host } from '../../../helper/comman_helper';
import { Noresults } from '../../layouts/Noresults';
import PaginationLogic from '../pagination-logic/PaginationLogic';

const Content = ({ agents, recentProperties, subCategoriesWithCount, setOffset, offset, limit, totalResults }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [loading, setLoading] = useState(false);

    const handleClick = (event) => {
        setLoading(true);
        if (event.target.getAttribute('data-action') === 'next') {
            setOffset(offset + 1);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setLoading(false);
            }, 2000);
        } else if (event.target.getAttribute('data-action') === 'previous') {
            setOffset(offset - 1);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setLoading(false);
            }, 2000);
        } else {
            setOffset(Number(event.target.getAttribute('data-page')) - 1);
            setTimeout(() => {
                setCurrentPage(Number(event.target.getAttribute('data-page')));
                setLoading(false);
            }, 2000);
        }
    }

    // Logic for displaying items
    // const indexOfLastitem = currentPage * itemsPerPage;
    // const indexOfFirstitem = indexOfLastitem - itemsPerPage;
    // const currentitems = agents //&& agents.slice(indexOfFirstitem, indexOfLastitem);

    let currentitems;
    if (totalResults == 0) {
        currentitems = [];
    } else {
        currentitems = agents
    }
    var renderitems = [];

    if (totalResults === undefined) {
        var renderitems = <Loader />
    }
    else if (totalResults == 0) {
        var renderitems = <Noresults />;
    } else {
        var renderitems = currentitems && currentitems.map((item, i) => {
            var url = "agent" + "/" + convertToSlug(item.name) + "/" + item.id;

            return <div key={i} className="col-lg-6">
                <div className="acr-agent">
                    <div className="acr-dots-wrapper acr-agent-thumb">
                        <div className="acr-dots" />
                        <Link to={{ pathname: url }}><img className="agentsProfileArea" src={item && item.profile_image ? Host + item.profile_image + ".jpg" : Host + "/users/default.png"} alt="agent" /></Link>
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
    }

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalResults / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPagination = pageNumbers.map(number => {
        const activeCondition = currentPage === number ? 'active' : ''
        return (
            <Fragment key={number}>
                {pageNumbers.length > 1 ? (
                    <li className={classNames("page-item", { active: activeCondition })}>
                        <Link
                            className="page-link"
                            to={'#'}
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
                                                        Host + item.image +
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
                                                    {item.title.slice(0, 45) + "..."}
                                                </Link>{" "}
                                            </h6>
                                            <span className="listing-price">Rs. {new Number(item.price).toLocaleString()}  {item.price_on}</span>
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
                        {pageNumbers.length > 1 ? (
                            <ul className="pagination">
                                {/* Prev */}
                                {/* to show previous, we need to be on the 2nd or more page */}
                                {pageNumbers.length > 1 && currentPage !== 1 ? (
                                    <li className="page-item">
                                        <Link className="page-link" to={window.location.search} data-page={parseInt(currentPage) - 1} data-action="previous" onClick={handleClick}>
                                            <i className="fas fa-chevron-left" data-page={parseInt(currentPage) - 1} data-action="previous" />
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
                                    <li className="page-item right-btn">
                                        <Link
                                            className="page-link"
                                            to={window.location.serach}
                                            data-page={currentPage} data-action="next"
                                            onClick={handleClick}
                                        >
                                            <i className="fas fa-chevron-right" data-page={currentPage} data-action="next" />
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

                </div>
            </div>
        </div>
    );
}

export default Content;