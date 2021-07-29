import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  pricerangelist,
  bedslist,
  category,
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
import { Endpoints, Host, convertToSlug } from "./../../helper/comman_helper";
import Axios from "axios";

const Shopsidebar = ({ parentCallback }) => {
  // console.log(locationlist);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);

  const [show, setShow] = useState(false);
  const [states, setStates] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [filterState, setFilterState] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterPrice, setFilterPrice] = useState(null);
  const [filterBeds, setFilterBeds] = useState(null);
  const [filterBathrooms, setFilterBathrooms] = useState(null);
  const [filterSubCategories, setFilterSubCategories] = useState(null);

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
    setStates(result.data.data);

  };
  const getRecentProperties = () => {
    var url = Host + Endpoints.getRecentProperties;
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert(response.data.title);
      } else {
        setRecentProperties(response.data.data);
      }
    });
  };
  const getSubCategories = async () => {
    var url = Host + Endpoints.getSubCategories;
    var result = await Axios.get(url);

    if (result.data.error === true) {
      console.log('there are some erros');

    } else {
      console.log(result.data.data);
      setSubCategories(result.data.data.categories);
    }
  }
  useEffect(() => {
    getSubCategories();
    getStates();
    getRecentProperties();
  }, []);

  const filter = (e) => {
    e.preventDefault();

    var data = {

      "category": filterCategory,
      "state": filterState,
      "min_price": filterPrice,
      "min_bedroom": filterBeds,
      "min_bathrooms": filterBathrooms,
      "subcategory": filterSubCategories,
    }

    var filterURL = Host + Endpoints.getPropertiesWithFilters;
    Axios.post(filterURL, data)
      .then((response) => {
        parentCallback(response.data.data.properties);
      })
      .catch((error) => {
        console.log(error)
      })

  };
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
              <form onSubmit={filter}>
                <div className="form-group">
                  <label>Select States</label>
                  <select className="form-control" name="states" onChange={(e) => setFilterState(e.target.value)}>
                    <option value="">Select States</option>
                    <option value="Any">Any States</option>
                    {states &&
                      states.map((value, index) => (
                        <option value={value.id}>{value.state_name}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group">
                  <label>Select category</label>
                  <select className="form-control" name="category" onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">Select category</option>
                    {category.map((value, index) => (
                      <option value={index}>{value}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Price</label>
                  <select className="form-control" name="pricerange" onChange={(e) => setFilterPrice(e.target.value)}>
                    <option value="">Select Price</option>
                    {pricerangelist.map((value, index) => (
                      <option value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Beds</label>

                  <select className="form-control" name="beds" onChange={(e) => setFilterBeds(e.target.value)}>
                    <option value="">Select Beds</option>
                    {bedslist.map((value, index) => (
                      <option value={index}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Bathrooms</label>

                  <select className="form-control" name="bathrooms" onChange={(e) => setFilterBathrooms(e.target.value)}>
                    <option value="">Select Bathrooms</option>
                    {bathroomslist.map((value, index) => (
                      <option value={index}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Subcategory</label>

                  <select className="form-control" name="subcategory" onChange={(e) => setFilterSubCategories(e.target.value)}>
                    <option value="">Select Subcategory</option>
                    {subCategories && subCategories.map((value, index) => (
                      <option value={value.id}>{value.name}</option>
                    ))}
                  </select>
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
            {recentProperties && recentProperties.slice(0, 4).map((item, i) => (
              <div key={i} className="listing listing-list">
                <div className="listing-thumbnail">
                  <Link to={`property/${convertToSlug(item.title)}/${item.id}`}>
                    <img
                      src={
                        process.env.REACT_APP_CONTENT_URL + item.image +
                        "_small.jpg"
                      }
                      alt={item.image + "_small.jpg"}
                    />
                  </Link>
                </div>
                <div className="listing-body">
                  <h6 className="listing-title">
                    {" "}
                    <Link
                      to={`property/${convertToSlug(item.title)}/${item.id}`}
                      title={item.title}
                    >
                      {item.title}
                    </Link>{" "}
                  </h6>
                  <span className="listing-price">
                    Rs. {new Number(item.price).toLocaleString()}
                    <span>/month</span>{" "}
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
