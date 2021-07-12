import React, { Component } from "react";

import {
  OverlayTrigger,
  Tooltip,
  Dropdown,
  NavLink,
  Tab,
  Nav,
} from "react-bootstrap";
import {
  locationlist,
  statuslist,
  pricerangelist,
  bedslist,
  bathroomslist,
  typelist,
  diameterlist,
  maxpricerangelist,
} from "../../../data/select.json";
import Select2 from "react-select2-wrapper";
import "../../../assets/css/restyle.css";

const redirectTo = () => {
  alert("rent");
};
const Consultants = () => {
  return (
    <div className="container searchContainer">
      <div className="row search-form-container">
        <Tab.Container defaultActiveKey="findAgents">
          <div className="col-lg-12">
            <h5 className="text-white">Search Properties</h5>
            <div className="sidebar sidebar-left">
              <div className="sidebar-widget">
                <Nav variant="tabs" className="nav nav-tabs tab-cards">
                  <Nav.Item>
                    <Nav.Link eventKey="buy">Buy</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    {/*onClick={() => redirectTo()}*/}
                    <Nav.Link eventKey="rent">Rent</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sold">Sold</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="findAgents">Find Agents</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>

            <Tab.Content className="m-0">
              <Tab.Pane eventKey="buy">
                <div className="agency-content">
                  <div className="sidebar-widget">
                    <form method="get" action="/property-listing">
                      <div className="search-wrapper">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Properties to own..."
                          name="search"
                        />
                        <i className="flaticon-search"></i>
                        <button type="submit" className="btn-custom">
                          {" "}
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={typelist}
                            options={{
                              placeholder: "Property Types",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (max)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={pricerangelist}
                            options={{
                              placeholder: "Price (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={maxpricerangelist}
                            options={{
                              placeholder: "Price (max)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div
                          className="form-group acr-custom-select"
                          style={{ marginTop: 20 }}
                        >
                          <input type="checkbox" />
                          <label style={{ marginLeft: 2, marginRight: 0 }}>
                            Surrounding suburbs
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="rent">
                <div className="agency-content">
                  <div className="sidebar-widget">
                    <form method="post">
                      <div className="search-wrapper">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search properties to rent..."
                          name="sidebar-search"
                        />
                        <i className="flaticon-search"></i>
                        <button
                          type="submit"
                          className="btn-custom"
                          name="button"
                        >
                          {" "}
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={typelist}
                            options={{
                              placeholder: "Property Types",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (max)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={pricerangelist}
                            options={{
                              placeholder: "Price (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={maxpricerangelist}
                            options={{
                              placeholder: "Price (max)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div
                          className="form-group acr-custom-select"
                          style={{ marginTop: 20 }}
                        >
                          <input type="checkbox" />
                          <label style={{ marginLeft: 2, marginRight: 0 }}>
                            Surrounding suburbs
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="sold">
                <div className="agency-content">
                  <div className="sidebar-widget">
                    <form method="post">
                      <div className="search-wrapper">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for sold properties..."
                          name="sidebar-search"
                        />
                        <i className="flaticon-search"></i>
                        <button
                          type="submit"
                          className="btn-custom"
                          name="button"
                        >
                          {" "}
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={typelist}
                            options={{
                              placeholder: "Property Types",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (max)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={pricerangelist}
                            options={{
                              placeholder: "Price (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={maxpricerangelist}
                            options={{
                              placeholder: "Price (max)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div
                          className="form-group acr-custom-select"
                          style={{ marginTop: 20 }}
                        >
                          <input type="checkbox" />
                          <label style={{ marginLeft: 2, marginRight: 0 }}>
                            Surrounding suburbs
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="findAgents">
                <div className="agency-content">
                  <div className="sidebar-widget">
                    <form method="post">
                      <div className="search-wrapper">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Find agents here..."
                          name="sidebar-search"
                        />
                        <i className="flaticon-search"></i>
                        <button
                          type="submit"
                          className="btn-custom"
                          name="button"
                        >
                          {" "}
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={typelist}
                            options={{
                              placeholder: "Property Types",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={bedslist}
                            options={{
                              placeholder: "Beds (max)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={pricerangelist}
                            options={{
                              placeholder: "Price (min)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2
                            data={maxpricerangelist}
                            options={{
                              placeholder: "Price (max)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div
                          className="form-group acr-custom-select"
                          style={{ marginTop: 20 }}
                        >
                          <input type="checkbox" />
                          <label style={{ marginLeft: 2, marginRight: 0 }}>
                            Surrounding suburbs
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>{" "}
          {/* Col-lg-12 ends */}
        </Tab.Container>
      </div>
    </div>
  );
};
export default Consultants;
