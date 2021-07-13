import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  pricerangelist,
  bedslist,
  category,
  propertyType,
  locationlist,
  statuslist,
  bathroomslist,
} from "../../data/select.json";
import Select2 from "react-select2-wrapper";
import listing from "../../data/listings.json";
import { Collapse, Button, Modal, Tabs, Tab } from "react-bootstrap";
import Buy from "../sections/filters/Buy.js";
import Rent from "../sections/filters/Rent.js";
import Sold from "../sections/filters/Sold.js";
import Keywordsearchbar from "../sections/filters/Keywordsearchbar";
import Searchbar from "../sections/filters/Searchbar";
import { Endpoints, Host } from "./../../helper/server";
import Axios from "axios";

const Shopsidebar = () => {
  // console.log(locationlist);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);

  const [show, setShow] = useState(false);
  const [states, setStates] = useState();

  function handleModal() {
    setShow(!show);
  }
  var url = Host + Endpoints.getStates;
  const getStates = async () => {
    var result = await Axios.get(url);

    const locationArray = [];
    for (const [key, value] of Object.entries(result.data.data)) {
      locationArray.push(value.state_name);
    }
    setStates(locationArray);
  };
  useEffect(() => {
    getStates();
  }, []);

  return (
    <div className="sidebar sidebar-left">
      <Modal
        show={show}
        onHide={handleModal}
        size="lg"
        scrollable={true}
        aria-labelledby="contained-modal-title-hcenter"
        centered
      >
        <Modal.Header closeButton>
          <h4>Filters</h4>
        </Modal.Header>
        <Modal.Body>
          <Searchbar />
          <Tabs defaultActiveKey="buy" id="uncontrolled-tab-example">
            <Tab eventKey="buy" title="Buy">
              <Buy />
            </Tab>
            <Tab eventKey="rent" title="Rent">
              <Rent />
            </Tab>
            <Tab eventKey="sold" title="Sold">
              <Sold />
            </Tab>
          </Tabs>
          <Keywordsearchbar />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-custom btn-sm secondary">Search</button>
          <Button variant="secondary" type="reset">
            Clear Filters
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="sidebar-widget">
        <div
          className="acr-collapse-trigger acr-custom-chevron-wrapper"
          onClick={() => setOpen(!open)}
        >
          <h5>Filter Listings</h5>
          <div className="acr-custom-chevron"></div>
        </div>
        <Collapse in={open}>
          <div className="acr-collapsable">
            <div className="acr-filter-form">
              <form>
                <div className="acr-custom-select form-group">
                  <label>State: </label>
                  <Select2
                    name="states"
                    data={states}
                    options={{
                      placeholder: "Any State",
                    }}
                  />
                </div>

                <div className="acr-custom-select form-group">
                  <label>Category: </label>
                  <Select2
                    name="propertStatus"
                    data={category}
                    options={{
                      placeholder: "Any Category",
                    }}
                  />
                </div>
                <div className="acr-custom-select form-group">
                  <label>Price Range: </label>
                  <Select2
                    name="priceRange"
                    data={pricerangelist}
                    options={{
                      placeholder: "Any Range",
                    }}
                  />
                </div>
                <div className="acr-custom-select form-group">
                  <label>Beds: </label>
                  <Select2
                    name="beds"
                    data={bedslist}
                    options={{
                      placeholder: "Any amount",
                    }}
                  />
                </div>
                <div className="acr-custom-select form-group">
                  <label>Bathrooms: </label>
                  <Select2
                    name="bathrooms"
                    data={bathroomslist}
                    options={{
                      placeholder: "Any amount",
                    }}
                  />
                </div>
                <div className="acr-custom-select form-group">
                  <label>Property Type: </label>
                  <Select2
                    name="propertytype"
                    data={propertyType}
                    options={{
                      placeholder: "Any Type",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="filter-btn btn-block btn-custom"
                  style={{ backgroundColor: "#007bff" }}
                >
                  Apply filters
                </button>
              </form>
            </div>
          </div>
        </Collapse>
      </div>

      <div className="sidebar-widget">
        <button
          type="submit"
          onClick={handleModal}
          className="btn-block btn-custom"
          name="button"
          // style={{ backgroundColor: "#007bff" }}
        >
          <i className="fa fa-filter" /> Advanced filters{" "}
        </button>
      </div>

      <div className="sidebar-widget">
        <div
          className="acr-collapse-trigger acr-custom-chevron-wrapper"
          // onClick={setOpen2(open2)}
        >
          <h5>Recent Listing</h5>
          <div className="acr-custom-chevron">
            <span />
            <span />
          </div>
        </div>
        <Collapse in={open2}>
          <div className="acr-collapsable">
            {/* Listing Start */}
            {listing
              .filter(function (item) {
                return item.recent === true;
              })
              .slice(0, 4)
              .map((item, i) => (
                <div key={i} className="listing listing-list">
                  <div className="listing-thumbnail">
                    <Link to="/listing-details-v1">
                      <img
                        src={process.env.PUBLIC_URL + "/" + item.gridimg}
                        alt="listing"
                      />
                    </Link>
                  </div>
                  <div className="listing-body">
                    <h6 className="listing-title">
                      {" "}
                      <Link to="/listing-details-v1" title={item.title}>
                        {item.title}
                      </Link>{" "}
                    </h6>
                    <span className="listing-price">
                      {new Intl.NumberFormat().format(
                        item.monthlyprice.toFixed(2)
                      )}
                      $ <span>/month</span>{" "}
                    </span>
                  </div>
                </div>
              ))}
            {/* Listing End */}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Shopsidebar;
