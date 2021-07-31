import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  floorlist,
  userTypeDrop,
  buildType,
  roadType,
  bedslist,
  bathroomslist,
  facing,
  carspaces,
  areaUnit,
  rooms,
  featuresType,
  areaSize, pricerangelist
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
  const [minFilterPrice, setMinFilterPrice] = useState(null);
  const [maxFilterPrice, setMaxFilterPrice] = useState(null);
  const [filterBeds, setFilterBeds] = useState(null);
  const [filterBathrooms, setFilterBathrooms] = useState(null);
  const [filterSubCategories, setFilterSubCategories] = useState(null);

  const [indoorFeatures, setIndoorFeatures] = useState([]);
  const [outdoorFeatures, setOutdoorFeatures] = useState([]);
  const [climateControlFeatures, setClimateControlFeatures] = useState([]);
  const [formData, setFormData] = useState();
  const [formName, setFormName] = useState('buy');


  const location = useLocation();
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
    var url = Host + Endpoints.getSubCategories + '?category_id=1';
    if (location.pathname == '/commercial') {
      var url = Host + Endpoints.getSubCategories + '?category_id=2';
    }
    var result = await Axios.get(url);

    if (result.data.error === true) {
      console.log('there are some erros');

    } else {
      console.log(result.data.data);
      setSubCategories(result.data.data.categories);
    }
  }

  const filter = (e) => {
    e.preventDefault();

    var data = {

      "category": filterCategory,
      "state": filterState,
      "min_price": minFilterPrice,
      "max_price": maxFilterPrice,
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
  const [filterData, setFilterData] = useState([]);
  const [selectedM, setSelectedM] = useState([]);

  const [selectedIndoorFeatures, setSelectedIndoorFeatures] = useState([]);
  const [selectedOutdoorFeatures, setSelectedOutdoorFeatures] = useState([]);
  const [selectedClimateFeatures, setSelectedClimateFeatures] = useState([]);

  const onChangeSubcategory = (id) => {
    let find = selectedM.indexOf(id);
    if (find > -1) {
      selectedM.splice(find, 1);
    } else {
      selectedM.push(id);
    }
    setSelectedM(selectedM);
  };
  const onChangeIndoorFeatures = (id) => {
    let find = selectedIndoorFeatures.indexOf(id);
    if (find > -1) {
      selectedIndoorFeatures.splice(find, 1);
    } else {
      selectedIndoorFeatures.push(id);
    }
    setSelectedIndoorFeatures(selectedIndoorFeatures);
  };
  const onChangeOutdoorFeatures = (id) => {
    let find = selectedOutdoorFeatures.indexOf(id);
    if (find > -1) {
      selectedOutdoorFeatures.splice(find, 1);
    } else {
      selectedOutdoorFeatures.push(id);
    }
    setSelectedOutdoorFeatures(selectedOutdoorFeatures);
  };
  const onChangeClimetFeatures = (id) => {
    let find = selectedClimateFeatures.indexOf(id);
    if (find > -1) {
      selectedClimateFeatures.splice(find, 1);
    } else {
      selectedClimateFeatures.push(id);
    }
    setSelectedClimateFeatures(selectedClimateFeatures);
  };

  const handleChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {

    var data = Object.assign(filterData, { 'subcategory': selectedM }, { 'indoor_features': selectedIndoorFeatures },
      { 'outdoor_features': selectedOutdoorFeatures }, { 'climate_features': selectedClimateFeatures }, { 'property_type': formName }
    );
    var url = Host + Endpoints.getPropertiesWithFilters;
    Axios.post(url, data)
      .then((response) => {
        parentCallback(response.data.data.properties);
        handleModal();
      })
      .catch((error) => {
        console.log(error)
      })

  }
  const handleSelect = (e) => {
    setFormName(e)
  }

  const getIndoorFeatures = () => {
    var url = Host + Endpoints.getfeatures + "indoor";
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        console.log(response.data.data);
        setIndoorFeatures(response.data.data.features);
      }
    });
  };
  const getOutDoorFeatures = () => {
    var url = Host + Endpoints.getfeatures + "outdoor";
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        console.log(response.data.data);
        setOutdoorFeatures(response.data.data.features);
      }
    });
  };
  const getClimateControlFeatures = () => {
    var url = Host + Endpoints.getfeatures + "Climate Control";
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        console.log(response.data.data);
        setClimateControlFeatures(response.data.data.features);
      }
    });
  };
  useEffect(() => {
    getSubCategories();
    getStates();
    getRecentProperties();
    getIndoorFeatures();
    getOutDoorFeatures();
    getClimateControlFeatures();
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
          <Tabs defaultActiveKey="buy" onSelect={(e) => handleSelect(e)} id="uncontrolled-tab-example">
            <Tab eventKey="buy" title="Buy">

              <form >
                <div className="col-md-12">
                  <div className="row">
                    <h5>Subcategory</h5>
                  </div>
                  <div className="row">
                    {subCategories &&
                      subCategories.map((value, index) => (
                        <div className="custom-control custom-checkbox col-lg-6 col-md-6">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={value.name}
                            onChange={(e) => onChangeSubcategory(value.id)}
                            selected={selectedM.includes(value.id)}
                          />
                          <label className="custom-control-label" htmlFor={value.name}>
                            {value.name}
                          </label>
                        </div>
                      ))}
                  </div>
                  {/* row ends */}
                </div>
                {/* COL-MD-12 ends */}
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Price Range</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Min Range</label>
                        <select
                          className="form-control"
                          name="min_price"
                          onChange={(e) => handleChange(e)}
                        >
                          {pricerangelist &&
                            pricerangelist.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max Range</label>
                        <select
                          className="form-control"
                          name="max_price"
                          onChange={(e) => handleChange(e)}
                        >
                          {pricerangelist &&
                            pricerangelist.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Bedrooms</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Min</label>
                        <select
                          className="form-control"
                          name="min_beds"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <select
                          className="form-control"
                          name="max_beds"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Bathrooms</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="min_bathrooms"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Car spaces</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="car_spaces"
                          onChange={(e) => handleChange(e)}
                        >
                          {carspaces &&
                            carspaces.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Area size</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="landsize"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Any</option>
                          {areaSize &&
                            areaSize.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>New or established property</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="build_type"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          <option value="old">Old</option>
                          <option value="new">New</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Indoor features</h5>
                  </div>
                  <div className="row">
                    {indoorFeatures &&
                      indoorFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeIndoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Outdoor features</h5>
                  </div>
                  <div className="row">
                    {outdoorFeatures &&
                      outdoorFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeOutdoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Climate control & energy</h5>
                  </div>
                  <div className="row">
                    {climateControlFeatures &&
                      climateControlFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeClimetFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Exclude under contract/offer"
                          onChange={(e) => setFilterData({ ...filterData, 'is_under_offer': e.target.checked ? 1 : 0 })}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Exclude under contract/offer"
                        >
                          Exclude under contract/offer
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </form>

            </Tab>
            <Tab eventKey="rent" title="Rent">
              <form >
                <div className="col-md-12">
                  <div className="row">
                    <h5>Subcategory</h5>
                  </div>
                  <div className="row">
                    {subCategories &&
                      subCategories.map((value, index) => (
                        <div className="custom-control custom-checkbox col-lg-6 col-md-6">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={value.name}
                            onChange={(e) => onChangeSubcategory(value.id)}
                            selected={selectedM.includes(value.id)}
                          />
                          <label className="custom-control-label" htmlFor={value.name}>
                            {value.name}
                          </label>
                        </div>
                      ))}
                  </div>
                  {/* row ends */}
                </div>
                {/* COL-MD-12 ends */}
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Price Range</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Min Range</label>
                        <select
                          className="form-control"
                          name="min_price"
                          onChange={(e) => handleChange(e)}
                        >
                          {pricerangelist &&
                            pricerangelist.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max Range</label>
                        <select
                          className="form-control"
                          name="max_price"
                          onChange={(e) => handleChange(e)}
                        >
                          {pricerangelist &&
                            pricerangelist.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Bedrooms</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Min</label>
                        <select
                          className="form-control"
                          name="min_beds"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <select
                          className="form-control"
                          name="max_beds"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Bathrooms</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="min_bathrooms"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Car spaces</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="car_spaces"
                          onChange={(e) => handleChange(e)}
                        >
                          {carspaces &&
                            carspaces.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Area size</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="landsize"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Any</option>
                          {areaSize &&
                            areaSize.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>New or established property</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="build_type"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          <option value="old">Old</option>
                          <option value="new">New</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Indoor features</h5>
                  </div>
                  <div className="row">
                    {indoorFeatures &&
                      indoorFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeIndoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Outdoor features</h5>
                  </div>
                  <div className="row">
                    {outdoorFeatures &&
                      outdoorFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeOutdoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Climate control & energy</h5>
                  </div>
                  <div className="row">
                    {climateControlFeatures &&
                      climateControlFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeClimetFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Exclude under contract/offer"
                          onChange={(e) => setFilterData({ ...filterData, 'is_under_offer': e.target.checked ? 1 : 0 })}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Exclude under contract/offer"
                        >
                          Exclude under contract/offer
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </form>

            </Tab>
            <Tab eventKey="sold" title="Sold">
              <form >
                <div className="col-md-12">
                  <div className="row">
                    <h5>Subcategory</h5>
                  </div>
                  <div className="row">
                    {subCategories &&
                      subCategories.map((value, index) => (
                        <div className="custom-control custom-checkbox col-lg-6 col-md-6">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={value.name}
                            onChange={(e) => onChangeSubcategory(value.id)}
                            selected={selectedM.includes(value.id)}
                          />
                          <label className="custom-control-label" htmlFor={value.name}>
                            {value.name}
                          </label>
                        </div>
                      ))}
                  </div>
                  {/* row ends */}
                </div>
                {/* COL-MD-12 ends */}
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Price Range</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Min Range</label>
                        <select
                          className="form-control"
                          name="min_price"
                          onChange={(e) => handleChange(e)}
                        >
                          {pricerangelist &&
                            pricerangelist.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max Range</label>
                        <select
                          className="form-control"
                          name="max_price"
                          onChange={(e) => handleChange(e)}
                        >
                          {pricerangelist &&
                            pricerangelist.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Bedrooms</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Min</label>
                        <select
                          className="form-control"
                          name="min_beds"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <select
                          className="form-control"
                          name="max_beds"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Bathrooms</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="min_bathrooms"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Car spaces</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="car_spaces"
                          onChange={(e) => handleChange(e)}
                        >
                          {carspaces &&
                            carspaces.map((value, index) => (
                              <option value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Area size</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="landsize"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Any</option>
                          {areaSize &&
                            areaSize.map((value, index) => (
                              <option value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>New or established property</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="build_type"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select beds</option>
                          <option value="old">Old</option>
                          <option value="new">New</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Indoor features</h5>
                  </div>
                  <div className="row">
                    {indoorFeatures &&
                      indoorFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeIndoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Outdoor features</h5>
                  </div>
                  <div className="row">
                    {outdoorFeatures &&
                      outdoorFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeOutdoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <h5>Climate control & energy</h5>
                  </div>
                  <div className="row">
                    {climateControlFeatures &&
                      climateControlFeatures.map((value, index) => (
                        <div key={index} className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={value.feature}
                              onChange={(e) => onChangeClimetFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature}
                            >
                              {value.feature}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Exclude under contract/offer"
                          onChange={(e) => setFilterData({ ...filterData, 'is_under_offer': e.target.checked ? 1 : 0 })}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Exclude under contract/offer"
                        >
                          Exclude under contract/offer
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </form>

            </Tab>
          </Tabs>
          <div className="row">
            <div className="col-md-12 form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Keywords..."
                onChange={(e) => setFilterData({ ...filterData, 'keywords': e.target.value })}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="submit" className="btn-custom btn-sm secondary" onClick={onSubmit}>Search</button>
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
                {/*
                <div className="form-group">
                  <label>Select category</label>
                  <select className="form-control" name="category" onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">Select category</option>
                    {category.map((value, index) => (
                      <option value={index}>{value}</option>
                    ))}
                  </select>
                </div>
            */}
                {location.pathname != '/commercial' ? (
                  <div className="form-group">
                    <label>Select Beds</label>

                    <select className="form-control" name="beds" onChange={(e) => setFilterBeds(e.target.value)}>
                      <option value="">Select Beds</option>
                      {bedslist.map((value, index) => (
                        <option value={index}>{value}</option>
                      ))}
                    </select>
                  </div>
                ) : ("")}

                {location.pathname != '/commercial' ? (
                  <div className="form-group">
                    <label>Select Bathrooms</label>

                    <select className="form-control" name="bathrooms" onChange={(e) => setFilterBathrooms(e.target.value)}>
                      <option value="">Select Bathrooms</option>
                      {bathroomslist.map((value, index) => (
                        <option value={index}>{value}</option>
                      ))}
                    </select>
                  </div>
                ) : ("")}



                <div className="form-group">
                  <label>Min Price</label>
                  <select className="form-control" name="pricerange" onChange={(e) => setMinFilterPrice(e.target.value)}>
                    <option value="">Select Price</option>
                    {pricerangelist.map((value, index) => (
                      <option value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Max Price</label>
                  <select className="form-control" name="pricerange" onChange={(e) => setMaxFilterPrice(e.target.value)}>
                    <option value="">Select Price</option>
                    {pricerangelist.map((value, index) => (
                      <option value={value}>{value}</option>
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

      {location.pathname != '/commercial' ? (
        <div className="sidebar-widget">
          <button
            type="submit"
            onClick={handleModal}
            className="btn-block btn-custom"
            name="button"
          >
            <i className="fa fa-filter" /> Advanced filters{" "}
          </button>
        </div>
      ) : ("")}

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
                      style={{ width: "130px", height: "86px" }}
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
