import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
export default function PaginationLogic({ setLoading, setOffset, setCurrentPage, currentPage, totalResults, loading, offset, limit }) {
    var paginationBtnLink = window.location.search === '' ? '#' : window.location.search
    const handleClick = (event) => {
        setLoading(true);
        setCurrentPage(currentPage + 1);
        if (event.target.getAttribute('data-action') === 'next') {
            setOffset(offset + 1);
        } else if (event.target.getAttribute('data-action') === 'previous') {
            setOffset(offset - 1);
            setCurrentPage(currentPage - 1);
        } else {
            setOffset(Number(event.target.getAttribute('data-page')) - 1);
            setCurrentPage(Number(event.target.getAttribute('data-page')));
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalResults / limit); i++) {
        pageNumbers.push(i);
    }
    const renderPagination = pageNumbers.map(number => {
        const activeCondition = currentPage === number ? 'active' : ''
        return (
            <Fragment key={number}>
                {pageNumbers.length > 1 ? (
                    <li className={classNames("page-item", { active: activeCondition })}>
                        <Link
                            className="page-link ra"
                            to={paginationBtnLink}
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
        <>
            {pageNumbers.length > 1 ? (
                <ul className="pagination">
                    {/* Prev */}
                    {/* to show previous, we need to be on the 2nd or more page */}
                    {pageNumbers.length > 1 && currentPage !== 1 ? (
                        <li className="page-item">
                            <Link className="page-link" to={paginationBtnLink} data-page={parseInt(currentPage) - 1} data-action="previous" onClick={handleClick}>
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
                                to={paginationBtnLink}
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
        </>
    )
}
