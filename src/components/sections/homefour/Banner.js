import React, { useState } from "react";
import classNames from "classnames";

import BuySearch from "./BuySearch";
import RentSearch from "./RentSearch";
import SoldSearch from "./SoldSearch";
import ShareSearch from "./ShareSearch";
import Consultants from "./Consultants";
// import 'C:/xampp/htdocs/neprealestate/src/assets/css/restyle.css';

const Banner = () => {
  const [advancesearch, setAdvancesearch] = useState(false);
  // this.advancetoggle = this.advancetoggle.bind(this);

  const advancetoggle = () => {
    setAdvancesearch(!advancesearch);
  };

  if (window.location.pathname === "/buy") {
    var searchBar = <BuySearch />;
  } else if (window.location.pathname === "/rent") {
    var searchBar = <RentSearch />;
  } else if (window.location.pathname === "/sold") {
    var searchBar = <SoldSearch />;
  } else if (window.location.pathname === "/share") {
    var searchBar = <ShareSearch />;
  } else if (window.location.pathname === "/consultants") {
    var searchBar = <Consultants />;
  } else {
    var searchBar = <BuySearch />;
  }
  return (
    <div
      className="subheader bg-cover bg-center dark-overlay"
      style={{
        backgroundImage:
          "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)",
      }}
    >
      <div className="container">
        <div className="col-md-6">
          <p className="banner-title">Find Your Ideal Home Today </p>
          <p style={{ color: "white", fontSize: "16px", fontWeight: 500 }}>
            Thousands of people have their flats up for grabs. Don't miss your
            chance to grab your own house today.
          </p>
        </div>
      </div>

      {searchBar}


    </div>
  );
};

export default Banner;
