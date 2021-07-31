import { map } from "leaflet";
import React, { useEffect, useState } from "react";
import { pricerangelist, maxpricerangelist } from "../../../data/select.json";
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
  areaSize,
} from "../../../data/select.json";
import Axios from "axios";
import { Host, Endpoints } from "../../../helper/comman_helper";
const Buy = ({ subCategories, handleCallback2 }) => {
  console.log(subCategories);
  const [selectedM, setSelectedM] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [indoorFeatures, setIndoorFeatures] = useState([]);
  const [outdoorFeatures, setOutdoorFeatures] = useState([]);
  const [climateControlFeatures, setClimateControlFeatures] = useState([]);

  const onChange = (id) => {
    let selected = selectedM;
    let find = selected.indexOf(id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(id);
    }
    setSelectedM(selectedM);
    console.log(selectedM);
  };

  const handleChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    console.log(filterData)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(filterData)
    handleCallback2(filterData);
  }
  return (
    <>
      <form>
        <div className="col-md-12">
          <div className="row">
            <h5>Subcategory</h5>
          </div>
          <div className="row">
            {subCategories &&
              subCategories.map((value, index) => (
                <div class="custom-control custom-checkbox col-lg-6 col-md-6">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={value.name}
                    onChange={(e) => onChange(value.id)}
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
                  name="min_range"
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
                  name="max_range"
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
                  name="min_bath"
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
                  name="min_carspaces"
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
                  <option value="Old">Old</option>
                  <option value="New">New</option>
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
                      onChange={(e) => handleChange(e)}
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
                      onChange={(e) => handleChange(e)}
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
                      onChange={(e) => handleChange(e)}
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

        <button type="submit" className="btn-custom btn-sm secondary" onClick={(e) => onSubmit(e)}>Search</button>
        <hr />
      </form>

    </>
  );
};
export default Buy;
