import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <Fragment>
        {/* Logo */}
        <Link className="navbar-brand" to="/home" style={{ width: 105 }}>
          <img
            src={process.env.PUBLIC_URL + "/assets/img/realestaelogo/logo.png"}
            alt="logo"
          />
        </Link>
        {/* Menu */}
        <ul className="navbar-nav">
          {/* <li className="menu-item menu-item-has-children"> */}
          {/* <Link to="/">Home</Link> */}
          {/* <ul className="submenu"> */}
          {/* <li className="menu-item"> <Link to="/">Home v1</Link> </li> */}
          {/* <li className="menu-item"> <Link to="/home-v2">Home v2</Link> </li> */}
          {/* <li className="menu-item"> <Link to="/home-v3">Home v3</Link> </li> */}
          {/* <li className="menu-item"> <Link to="/home-v4">Home v4</Link> </li> */}
          {/* <li className="menu-item"> <Link to="/home-v5">Home v5</Link> </li> */}
          {/* </ul> */}
          {/* </li> */}
          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/buy">
              Buy
            </NavLink>
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/rent">
              Rent
            </NavLink>
            {/* <ul className="submenu"> */}
            {/* <li className="menu-item menu-item-has-children"> */}
            {/* <Link to="/blog-grid">Blog Archive</Link> */}
            {/* <ul className="submenu"> */}
            {/* <li className="menu-item"> <Link to="/blog-grid">Grid View</Link> </li> */}
            {/* <li className="menu-item"> <Link to="/blog-list">List View</Link> </li> */}
            {/* </ul> */}
            {/* </li> */}
            {/* <li className="menu-item"> */}
            {/* <Link to="/blog-single">Blog Single</Link> */}
            {/* </li> */}
            {/* </ul> */}
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink className="nav-link" exact to="/share">
              Share
            </NavLink>
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink className="nav-link" exact to="/sold">
              Sold
            </NavLink>
          </li>

          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/commercial">
              Commercial
            </NavLink>
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/consultants">
              Property Consultant
            </NavLink>
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/about">
              About Us
            </NavLink>
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/news">
              News
            </NavLink>
          </li>
          <li className="menu-item menu-item-has-children">
            <NavLink exact to="/contact">
              Contact Us
            </NavLink>
          </li>


        </ul>
        {/*<div className="header-controls">
          <ul className="header-controls-inner d-none d-lg-flex">
            <li>
              <a className="btn-custom primary" href="/add-property">
                Submit Listing <i className="fas fa-plus"></i>{" "}
              </a>
            </li>
          </ul>
          <div className="aside-toggler aside-trigger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>*/}
      </Fragment>
    );
  }
}

export default Menu;
