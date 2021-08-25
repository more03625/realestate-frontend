import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  bedslist,
  bathroomslist,
  carspaces,
  areaUnit,
  pricerangelist
} from "../../data/select.json";
import { Collapse, Button, Modal, Tabs, Tab } from "react-bootstrap";
import Searchbar from "../sections/filters/Searchbar";
import { Endpoints, Host, convertToSlug, uppercaseFirstLetter } from "./../../helper/comman_helper";
import Axios from "axios";
// import Select2 from "react-select2-wrapper";
// import listing from "../../data/listings.json";
// import Buy from "../sections/filters/Buy.js";
// import Rent from "../sections/filters/Rent.js";
// import Sold from "../sections/filters/Sold.js";
// import Keywordsearchbar from "../sections/filters/Keywordsearchbar";
const Shopsidebar = ({ parentCallback, setSelectedFilters, loadingButton }) => {

  // console.log(locationlist);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);

  const [show, setShow] = useState(false);
  const [states, setStates] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [filterState, setFilterState] = useState(null);
  const [filterPropertyType, setFilterPropertyType] = useState(null);
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
      setSubCategories(result.data.data.categories);
    }
  }
  const [propertyTypes, setPropertyTypes] = useState([]);

  const getPropertyTypes = (categoryID = '') => {
    var url = Host + Endpoints.getPropertyTypes + '1';
    if (location.pathname == '/commercial') {
      var url = Host + Endpoints.getPropertyTypes + '2';
    }

    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        setPropertyTypes(response.data.data);
      }
    });
  };
  const [loadMore, setLoadMore] = useState(2); // limit 
  const [offset, setOffset] = useState(0);
  const queryParams = new URLSearchParams(window.location.search);
  var subCategoryID = queryParams.get("subcategory_id");
  var property_type = queryParams.get("property_type");

  const filter = (e) => { // Normal Filter
    e.preventDefault();
    var data = {
      "property_type": filterPropertyType === null ? property_type : filterPropertyType,
      "category": filterCategory !== null ? filterCategory.toString() : filterCategory,
      "state": filterState,
      "min_price": minFilterPrice,
      "max_price": maxFilterPrice,
      "min_bedroom": filterBeds,
      "min_bathrooms": filterBathrooms,
      "subcategory": filterSubCategories !== null ? filterSubCategories.toString() : filterSubCategories === null ? subCategoryID : filterSubCategories,
      "offset": offset
    }

    setSelectedFilters(data);

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
  const clearFilters = (e) => {
    for (var i = 0; i < document.getElementsByClassName("filter_form").length; i++) {
      document.getElementsByClassName("filter_form")[i].reset();
    }
  }
  const onSubmit = (e) => { // Advanced Filters

    Object.assign(filterData, { 'subcategory': '' }, { 'indoor_features': '' },
      { 'outdoor_features': '' }, { 'climate_features': '' }, { 'property_type': '' }
    );
    console.log("This is from RAHUL MORE: ")
    var data = Object.assign(filterData, { 'subcategory': selectedM.length !== 0 ? selectedM.toString() : subCategoryID }, { 'indoor_features': selectedIndoorFeatures !== null ? selectedIndoorFeatures.toString() : selectedIndoorFeatures },
      { 'outdoor_features': selectedOutdoorFeatures.toString() }, { 'climate_features': selectedClimateFeatures !== null ? selectedClimateFeatures.toString() : selectedClimateFeatures }, { 'property_type': formName }
    );
    setSelectedFilters(data);
    handleModal();

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
        setClimateControlFeatures(response.data.data.features);
      }
    });
  };
  useEffect(() => {
    getPropertyTypes();
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

              <form className="filter_form">
                <div className="col-md-12">
                  <div className="row">
                    <h5>Subcategory</h5>
                  </div>
                  <div className="row">
                    {subCategories &&
                      subCategories.map((value, index) => (
                        <div key={index} className="custom-control custom-checkbox col-lg-6 col-md-6">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={value.name + " Buy"}
                            onChange={(e) => onChangeSubcategory(value.id)}
                            selected={selectedM.includes(value.id)}
                          />
                          <label className="custom-control-label" htmlFor={value.name + " Buy"}>
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
                              <option key={value.id} value={value.id}>{value.text}</option>
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
                              <option key={value.id} value={value.id}>{value.text}</option>
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
                          name="min_bedroom"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Bedrooms</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <select
                          className="form-control"
                          name="max_bedroom"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Bedrooms</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
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
                          <option value="">Select Bathrooms</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
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
                              <option key={index} value={index + 1}>{value}</option>
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
                        <label>Area Unit</label>
                        <select
                          className="form-control"
                          name="landsize"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Any</option>
                          {areaUnit &&
                            areaUnit.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Area Size</label>

                        <input className="form-control" name="landsize" placeholder="Enter area size" onChange={(e) => handleChange(e)} />
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
                          <option value="">Any</option>
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
                              id={value.feature + " Buy"}
                              onChange={(e) => onChangeIndoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature + " Buy"}
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
                              id={value.feature + " Buy"}
                              onChange={(e) => onChangeOutdoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature + " Buy"}
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
                              id={value.feature + " Buy"}
                              onChange={(e) => onChangeClimetFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature + " Buy"}
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
                          id="Exclude under contract/offer buy"
                          onChange={(e) => setFilterData({ ...filterData, 'is_under_offer': e.target.checked ? 1 : 0 })}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Exclude under contract/offer buy"
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
              <form className="filter_form">
                <div className="col-md-12">
                  <div className="row">
                    <h5>Subcategory</h5>
                  </div>
                  <div className="row">
                    {subCategories &&
                      subCategories.map((value, index) => (
                        <div key={index} className="custom-control custom-checkbox col-lg-6 col-md-6">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={value.name + " rent"}
                            onChange={(e) => onChangeSubcategory(value.id)}
                            selected={selectedM.includes(value.id)}
                          />
                          <label className="custom-control-label" htmlFor={value.name + " rent"}>
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
                              <option key={index} value={value.id}>{value.text}</option>
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
                              <option key={index} value={value.id}>{value.text}</option>
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
                          name="min_bedroom"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Bedrooms</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <select
                          className="form-control"
                          name="max_bedroom"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Bedrooms</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
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
                          <option value="">Select Bathrooms</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
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
                              <option key={index} value={index + 1}>{value}</option>
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
                          {areaUnit &&
                            areaUnit.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" name="landsize" placeholder="Enter area size" onChange={(e) => handleChange(e)} />
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
                          <option value="">Any</option>
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
                              id={value.feature + " rent"}
                              onChange={(e) => onChangeIndoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature + " rent"}
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
                              id={value.feature + " rent"}
                              onChange={(e) => onChangeOutdoorFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature + " rent"}
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
                              id={value.feature + " rent"}
                              onChange={(e) => onChangeClimetFeatures(value.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={value.feature + " rent"}
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
                          id="Exclude under contract/offer rent"
                          onChange={(e) => setFilterData({ ...filterData, 'is_under_offer': e.target.checked ? 1 : 0 })}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Exclude under contract/offer rent"
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
              <form className="filter_form">
                <div className="col-md-12">
                  <div className="row">
                    <h5>Subcategory</h5>
                  </div>
                  <div className="row">
                    {subCategories &&
                      subCategories.map((value, index) => (
                        <div key={index} className="custom-control custom-checkbox col-lg-6 col-md-6">
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
                              <option key={index} value={value.id}>{value.text}</option>
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
                              <option key={index} value={value.id}>{value.text}</option>
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
                          name="min_bedroom"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Bedrooms</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <select
                          className="form-control"
                          name="max_bedroom"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Bedrooms</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
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
                          <option value="">Select Bathrooms</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
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
                              <option key={index} value={index + 1}>{value}</option>
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
                          {areaUnit &&
                            areaUnit.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" name="landsize" placeholder="Enter area size" onChange={(e) => handleChange(e)} />
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
                          <option value="">Any</option>
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
          <Button variant="secondary" type="reset" onClick={clearFilters}>
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
                  <label>Property by type</label>
                  <select className="form-control" name="property_type" onChange={(e) => setFilterPropertyType(e.target.value)}>
                    <option value="">Any</option>
                    {propertyTypes &&
                      propertyTypes.map((value, index) => (
                        <option key={index} value={value.name}>{uppercaseFirstLetter(value.name)}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group">
                  <label>Select States</label>
                  <select className="form-control" name="states" onChange={(e) => setFilterState(e.target.value)}>
                    <option value="">Select States</option>
                    <option value="Any">Any States</option>
                    {states &&
                      states.map((value, index) => (
                        <option key={index} value={value.id}>{value.state_name}</option>
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
                        <option key={index} value={index}>{value}</option>
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
                        <option key={index} value={index}>{value}</option>
                      ))}
                    </select>
                  </div>
                ) : ("")}



                <div className="form-group">
                  <label>Min Price</label>
                  <select className="form-control" name="pricerange" onChange={(e) => setMinFilterPrice(e.target.value)}>
                    <option value="">Select Price</option>
                    {pricerangelist.map((value, index) => (
                      <option key={index} value={value.id}>{value.text}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Max Price</label>
                  <select className="form-control" name="pricerange" onChange={(e) => setMaxFilterPrice(e.target.value)}>
                    <option value="">Select Price</option>
                    {pricerangelist.map((value, index) => (
                      <option key={index} value={value.id}>{value.text}</option>
                    ))}
                  </select>
                </div>



                <div className="form-group">
                  <label>Select Subcategory</label>
                  <select className="form-control" name="subcategory" onChange={(e) => setFilterSubCategories(e.target.value)}>
                    <option value="">Select Subcategory</option>
                    {subCategories && subCategories.map((value, index) => (
                      <option key={index} value={value.id}>{value.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="filter-btn btn-block btn-custom"
                  style={{ backgroundColor: "#007bff" }}
                  disabled={loadingButton}
                >
                  Apply filters
                  {loadingButton === true ?
                    <div className="ml-1 spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div> : ''
                  }

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
                      {item.title.slice(0, 45) + "..."}
                    </Link>{" "}
                  </h6>
                  <span className="listing-price">
                    Rs. {new Number(item.price).toLocaleString()}
                    <span> {item.price_on}</span>{" "}
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
