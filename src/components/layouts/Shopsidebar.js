import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import {
  pricerangelist,
  bedslist,
  typelist,
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

class Shopsidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      open2: true,
      open3: true,
      show: false,
    };
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const { open } = this.state;
    const { open2 } = this.state;
    const { open3 } = this.state;
    return (
      <div className="sidebar sidebar-left">
        <Modal
          show={this.state.show}
          onHide={() => this.handleModal()}
          size="lg"
          scrollable={true}
          aria-labelledby="contained-modal-title-hcenter"
          centered
        >
          <Modal.Header closeButton>
            <h4>Filters</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search region, suburb or postcode"
                />
              </div>
            </div>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="sidebar-widget">
          <div
            className="acr-collapse-trigger acr-custom-chevron-wrapper"
            onClick={() => this.setState({ open: !open })}
          >
            <h5>Filter Listings</h5>
            <div className="acr-custom-chevron"></div>
          </div>
          <Collapse in={this.state.open}>
            <div className="acr-collapsable">
              <div className="acr-filter-form">
                <form>
                  <div className="acr-custom-select form-group">
                    <label>Location: </label>
                    <Select2
                      data={locationlist}
                      options={{
                        placeholder: "Any Location",
                      }}
                    />
                  </div>
                  <div className="acr-custom-select form-group">
                    <label>Status: </label>
                    <Select2
                      data={statuslist}
                      options={{
                        placeholder: "Any Status",
                      }}
                    />
                  </div>
                  <div className="acr-custom-select form-group">
                    <label>Price Range: </label>
                    <Select2
                      data={pricerangelist}
                      options={{
                        placeholder: "Any Range",
                      }}
                    />
                  </div>
                  <div className="acr-custom-select form-group">
                    <label>Beds: </label>
                    <Select2
                      data={bedslist}
                      options={{
                        placeholder: "Any amount",
                      }}
                    />
                  </div>
                  <div className="acr-custom-select form-group">
                    <label>Bathrooms: </label>
                    <Select2
                      data={bathroomslist}
                      options={{
                        placeholder: "Any amount",
                      }}
                    />
                  </div>
                  <div className="acr-custom-select form-group">
                    <label>Type: </label>
                    <Select2
                      data={typelist}
                      options={{
                        placeholder: "Any Type",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-block btn-custom"
                    name="button"
                  >
                    Apply filters
                  </button>
                </form>
              </div>
            </div>
          </Collapse>
        </div>

        <div className="sidebar-widget">
          <h5>Advanced filters</h5>
          <button
            type="submit"
            onClick={() => this.handleModal()}
            className="btn-block btn-custom"
            name="button"
          >
            <i className="fa fa-filter" /> Advanced filters{" "}
          </button>
        </div>

        <div className="sidebar-widget">
          <div
            className="acr-collapse-trigger acr-custom-chevron-wrapper"
            onClick={() => this.setState({ open2: !open2 })}
          >
            <h5>Recent Listing</h5>
            <div className="acr-custom-chevron">
              <span />
              <span />
            </div>
          </div>
          <Collapse in={this.state.open2}>
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
  }
}

export default Shopsidebar;
