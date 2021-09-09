import React from "react";

import {
  Tab,
} from "react-bootstrap";
import { ActualSearch } from "./Searchbarareas/ActualSearch";

const RentSearch = () => {
  return (
    <div className="container searchContainer">
      <div className="row search-form-container">
        <Tab.Container defaultActiveKey="rent">
          <div className="col-lg-12">
            <h5 className="text-white">Search Properties</h5>
            <ActualSearch />
          </div>{" "}
          {/* Col-lg-12 ends */}
        </Tab.Container>
      </div>
    </div>
  );
};
export default RentSearch;
