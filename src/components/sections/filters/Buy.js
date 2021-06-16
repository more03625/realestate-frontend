import React, { Component } from "react";

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
              <div className="form-group">
                <label>Min Range</label>
                <select className="form-control" name="min_range">
                    <option value="">Any</option>
                    <option value="$60k">$60k</option>
                    <option value="$80k">$80k</option>
                    <option value="$100k">$100k</option>
                    <option value="$120k">$120k</option>
                    <option value="$140k">$140k</option>
                    <option value="$160k">$160k</option>
                    <option value="$180k">$180k</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Max Range</label>
                <select className="form-control" name="max_range">
                    <option value="">Any</option>
                    <option value="$60k">$60k</option>
                    <option value="$80k">$80k</option>
                    <option value="$100k">$100k</option>
                    <option value="$120k">$120k</option>
                    <option value="$140k">$140k</option>
                    <option value="$160k">$160k</option>
                    <option value="$180k">$180k</option>
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
                <select className="form-control" name="min_beds">
                    <option value="">Any</option>
                    <option value="Studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
                <label>Max</label>
                <select className="form-control" name="max_beds">
                    <option value="">Any</option>
                    <option value="Studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
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
                <select className="form-control" name="min_bath">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                </select>
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
              <div className="form-group">
                <select className="form-control" name="min_carspaces">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                </select>
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
            <div className="col-md-6">
              <div className="form-group">
                <select className="form-control" name="landsize">
                <option value="">Any</option>
                <option value="1">200 ㎡</option>
                <option value="1">300 ㎡</option>
                <option value="1">400 ㎡</option>
                <option value="1">500 ㎡</option>
                <option value="1">600 ㎡</option>
                <option value="1">700 ㎡</option>
                <option value="1">800 ㎡</option>
                <option value="1">900 ㎡</option>
                <option value="1">1,000 ㎡</option>
                <option value="1">1,200 ㎡</option>
                <option value="1">1,500 ㎡</option>
                <option value="1">1,750 ㎡</option>
                <option value="1">2,000 ㎡</option>
                <option value="1">3,000 ㎡</option>
                <option value="1">4,000 ㎡</option>
                <option value="1">5,000 ㎡</option>
                <option value="1">10,000 ㎡</option>
                <option value="1">20,000 ㎡</option>
                <option value="1">30,000 ㎡</option>
                <option value="1">40,000 ㎡</option>
                <option value="1">50,000 ㎡</option>
                <option value="1">100,000 ㎡</option>
                <option value="1">200,000 ㎡</option>
                <option value="1">300,000 ㎡</option>
                <option value="1">400,000 ㎡</option>
                <option value="1">500,000 ㎡</option>
                <option value="1">600,000 ㎡</option>
                <option value="1">700,000 ㎡</option>
                <option value="1">800,000 ㎡</option>
                <option value="1">900,000 ㎡</option>
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
