import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { blogblock, blogcategory } from '../../data/blog.json';

class Blogsidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-widget">
                    <form method="post">
                        <h5>Search News</h5>
                        <div className="search-wrapper">
                            <input type="text" className="form-control" placeholder="Search" name="sidebar-search" />
                            <button type="submit" className="btn-custom"><i className="flaticon-search" /></button>
                        </div>
                    </form>
                </div>
                <div className="sidebar-widget">
                    <h5>Recent News</h5>
                    {blogblock.filter(function (item) { return item.recent === true }).slice(0,4).map((item, i) => (
                        <article key={i} className="media">
                            <Link to="/blog-single"><img src={process.env.PUBLIC_URL + "/" + item.gridimg} alt="post" /></Link>
                            <div className="media-body">
                                <h6> <Link to="/blog-single">{item.title}</Link> </h6>
                                <span>{item.postdate}</span>
                            </div>
                        </article>
                    ))}
                </div>
            
                
            </div>
        );
    }
}

export default Blogsidebar;