import React from "react";
import {
  Tab,
} from "react-bootstrap";

import "../../../assets/css/restyle.css";
import { ActualSearch } from "./Searchbarareas/ActualSearch";

const Consultants = () => {
  return (
    <div className="container searchContainer">
      <div className="row search-form-container">
        <Tab.Container defaultActiveKey="findAgents">
          <div className="col-lg-12">
            <h5 className="text-white">Search Properties</h5>
            <ActualSearch />
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};
export default Consultants;
