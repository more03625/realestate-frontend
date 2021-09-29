import React from "react";

import {

  NavLink,
  Tab,
  Nav,
} from "react-bootstrap";

import Select2 from "react-select2-wrapper";
import { ActualSearch } from "./Searchbarareas/ActualSearch";


const redirectTo = () => {
  alert("rent");
};
const ShareSearch = () => {
  return (
    <div className="container searchContainer px-3">
      <div className="row search-form-container px-0">
        <Tab.Container defaultActiveKey="share">
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
export default ShareSearch;
