import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import Searchbar from "../sections/filters/Searchbar";
import { Endpoints, Host, convertToSlug, uppercaseFirstLetter } from "./../../helper/comman_helper";
import Axios from "axios";
import FilterModal from './FilterModal';

const Shopsidebar = ({ loadingButton, setShow, show, advancedFilterModal, filterData, setFilterData, setRunUseEffect, runUseEffect }) => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);

  const [states, setStates] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);

  const [filterState, setFilterState] = useState(null);
  const [filterPropertyType, setFilterPropertyType] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [minFilterPrice, setMinFilterPrice] = useState(null);
  const [maxFilterPrice, setMaxFilterPrice] = useState(null);
  const [filterBeds, setFilterBeds] = useState(null);
  const [filterBathrooms, setFilterBathrooms] = useState(null);
  const [filterSubCategories, setFilterSubCategories] = useState(null);

  const [formName, setFormName] = useState('buy');
  const [offset, setOffset] = useState(0);
  const [selectedIndoorFeatures, setSelectedIndoorFeatures] = useState([]);
  const [selectedOutdoorFeatures, setSelectedOutdoorFeatures] = useState([]);
  const [selectedClimateFeatures, setSelectedClimateFeatures] = useState([]);
  const [selectedM, setSelectedM] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [indoorFeatures, setIndoorFeatures] = useState([]);
  const [outdoorFeatures, setOutdoorFeatures] = useState([]);
  const [climateControlFeatures, setClimateControlFeatures] = useState([]);
  const location = useLocation();

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
    var url = Host + Endpoints.getRecentProperties + `?type=${property_type}`;
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert(response.data.title);
      } else {
        setRecentProperties(response.data.data);
      }
    });
  };

  const queryParams = new URLSearchParams(window.location.search);
  var subCategoryID = queryParams.get("subcategory_id");
  var search = queryParams.get("search");
  var property_type = queryParams.get("property_type");


  const onSubmit = (e) => { // Advanced Filters
    advancedFilterModal();
    // below is IMP to send Checkbox Data else checkbox will not work. 
    var data = Object.assign(
      filterData,
      { 'subcategory': selectedM.length !== 0 ? selectedM.toString() : subCategoryID },
      { 'indoor_features': selectedIndoorFeatures !== null ? selectedIndoorFeatures.toString() : selectedIndoorFeatures },
      { 'outdoor_features': selectedOutdoorFeatures.toString() },
      { 'climate_features': selectedClimateFeatures !== null ? selectedClimateFeatures.toString() : selectedClimateFeatures },
      { 'property_type': formName }
    );

    setFilterData(data);
    setRunUseEffect(!runUseEffect);
  }
  const handleSelect = (e) => {
    setFormName(e)
  }
  const getSubCategories = async () => {
    var url = Host + Endpoints.getSubCategories + '?type=' + formName;
    if (window.location.pathname == '/commercial') {
      var url = Host + Endpoints.getSubCategories + '?category_id=2';
    }
    var result = await Axios.get(url);

    if (result.data.error === true) {
      console.log('there are some erros');
    } else {
      setSubCategories(result.data.data.categories);
    }
  }
  const getPropertyTypes = (categoryID = '') => {
    var url = Host + Endpoints.getPropertyTypes + '1';
    if (window.location.pathname == '/commercial') {
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
    getSubCategories();
  }, [formName])

  useEffect(() => {
    getStates();
    getRecentProperties();
    getPropertyTypes();

    getIndoorFeatures();
    getOutDoorFeatures();
    getClimateControlFeatures();
  }, []);


  return (
    <div className="sidebar sidebar-left">
      <Modal
        show={show}
        onHide={advancedFilterModal}
        size="lg"
        scrollable={true}
        aria-labelledby="contained-modal-title-hcenter"
        centered
      >
        <Modal.Header closeButton>
          <h4>Filters</h4>
        </Modal.Header>
        <Modal.Body>

          <Searchbar search={search} setFilterData={setFilterData} filterData={filterData} />

          <Tabs defaultActiveKey="buy" onSelect={(e) => handleSelect(e)} id="uncontrolled-tab-example">
            <Tab eventKey="buy" title="Buy">
              <FilterModal
                tabName="buy"
                setFilterData={setFilterData}
                filterData={filterData}
                selectedIndoorFeatures={selectedIndoorFeatures}
                selectedOutdoorFeatures={selectedOutdoorFeatures}
                selectedClimateFeatures={selectedClimateFeatures}
                setSelectedIndoorFeatures={setSelectedIndoorFeatures}
                setSelectedOutdoorFeatures={setSelectedOutdoorFeatures}
                setSelectedClimateFeatures={setSelectedClimateFeatures}
                setSelectedM={setSelectedM}
                selectedM={selectedM}
                subCategories={subCategories}
                indoorFeatures={indoorFeatures}
                outdoorFeatures={outdoorFeatures}
                climateControlFeatures={climateControlFeatures}
              />
            </Tab>
            <Tab eventKey="rent" title="Rent">
              <FilterModal
                tabName="rent"
                setFilterData={setFilterData}
                filterData={filterData}
                selectedIndoorFeatures={selectedIndoorFeatures}
                selectedOutdoorFeatures={selectedOutdoorFeatures}
                selectedClimateFeatures={selectedClimateFeatures}
                setSelectedIndoorFeatures={setSelectedIndoorFeatures}
                setSelectedOutdoorFeatures={setSelectedOutdoorFeatures}
                setSelectedClimateFeatures={setSelectedClimateFeatures}
                setSelectedM={setSelectedM}
                selectedM={selectedM}
                subCategories={subCategories}
                indoorFeatures={indoorFeatures}
                outdoorFeatures={outdoorFeatures}
                climateControlFeatures={climateControlFeatures}
              />
            </Tab>
            <Tab eventKey="sold" title="Sold">
              <FilterModal
                tabName="sold"
                setFilterData={setFilterData}
                filterData={filterData}
                selectedIndoorFeatures={selectedIndoorFeatures}
                selectedOutdoorFeatures={selectedOutdoorFeatures}
                selectedClimateFeatures={selectedClimateFeatures}
                setSelectedIndoorFeatures={setSelectedIndoorFeatures}
                setSelectedOutdoorFeatures={setSelectedOutdoorFeatures}
                setSelectedClimateFeatures={setSelectedClimateFeatures}
                setSelectedM={setSelectedM}
                selectedM={selectedM}
                subCategories={subCategories}
                indoorFeatures={indoorFeatures}
                outdoorFeatures={outdoorFeatures}
                climateControlFeatures={climateControlFeatures}
              />
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
          <Button variant="secondary" type="button" onClick={() => setShow(!show)}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
};

export default Shopsidebar;
