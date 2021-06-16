import React, { Component } from "react";
import Select2 from "react-select2-wrapper";
import { 
    pricerangelist,
    bedslist,
    typelist,
    locationlist,
    statuslist,
    bathroomslist,
 } from "../../../data/select.json";

class Buy extends Component {
  render() {
    return (
      <>
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="row">
              <h5>Buy Property Types</h5>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    All Types
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Apartment & Unit
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Villa
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Acreage
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Block Of Units
                  </label>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    House
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Town House
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Rural
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Land
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="allTypes"
                  />
                  <label className="custom-control-label" htmlFor="allTypes">
                    Retirement Living
                  </label>
                </div>
              </div>
            </div>
            {/* row ends */}
          </div>
          {/* COL-MD-12 ends */}
        </div>

        <hr />
        <div className="col-md-12">
          <div className="row">
            <h5>Price Range</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group acr-custom-select">
                <Select2
                  data={pricerangelist}
                  options={{
                    placeholder: "Any",
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group acr-custom-select">
                <Select2
                  data={typelist}
                  options={{
                    placeholder: "Any",
                  }}
                />
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
              <div className="acr-custom-select form-group">
                <label>Type: </label>
                <Select2
                  data={bedslist}
                  options={{
                    placeholder: "Any",
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group acr-custom-select">
                <Select2
                  data={bedslist}
                  options={{
                    placeholder: "Any",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-md-12">
          <div className="row">
            <h5>Carspaces</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
            <div className="acr-custom-select form-group">
                    <label>Status: </label>
                    <Select2
                      data={statuslist}
                      options={{
                        placeholder: "Any Status",
                      }}
                    />
                  </div>

         
            </div>
          </div>
        </div>
        <hr />
        <div className="col-md-12">
          <div className="row">
            <h5>Landsize</h5>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group acr-custom-select">
                <Select2
                  data={locationlist}
                  options={{
                    placeholder: "Any",
                  }}
                />
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
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allTypes"
                />
                <label className="custom-control-label" htmlFor="allTypes">
                  New
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allTypes"
                />
                <label className="custom-control-label" htmlFor="allTypes">
                  Established
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-md-12">
          <div className="row">
            <h5>Outdoor features</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allTypes"
                />
                <label className="custom-control-label" htmlFor="allTypes">
                  Swimming pool
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allTypes"
                />
                <label className="custom-control-label" htmlFor="allTypes">
                  Balcony
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allTypes"
                />
                <label className="custom-control-label" htmlFor="allTypes">
                  Garage
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="allTypes"
                />
                <label className="custom-control-label" htmlFor="allTypes">
                  Outdoor area
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }
}
export default Buy;
