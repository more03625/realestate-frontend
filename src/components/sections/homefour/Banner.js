import React, { Component } from 'react';
import { locationlist, statuslist, pricerangelist, bedslist, bathroomslist, typelist, diameterlist, maxpricerangelist } from '../../../data/select.json';
import Select2 from 'react-select2-wrapper';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Tab, Nav } from 'react-bootstrap';
// import 'C:/xampp/htdocs/neprealestate/src/assets/css/restyle.css';
import '../../../assets/css/restyle.css';

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            advancesearch: false
        }
        this.advancetoggle = this.advancetoggle.bind(this);
    }
    advancetoggle() {
        this.setState({
            advancesearch: !this.state.advancesearch
        })
    }
    render() {
        return (
<div className="subheader bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)" }}>
  <div className="container">
    <div className="col-md-6"> 
      <p className="banner-title">Find Your Ideal Home Today </p>
      <p style={{color: 'white', fontSize: '16px', fontWeight: 500}}>Thousands of people have their flats up for grabs. Don't miss your chance to grab your own house today.</p>
    </div>
  </div>
  <div className="container searchContainer">
    <div className="row search-form-container">
      <Tab.Container defaultActiveKey="buy">
        <div className="col-lg-12">
          <h5 className="text-white">Search Properties</h5>
          <div className="sidebar sidebar-left">
            <div className="sidebar-widget">
              <Nav variant="tabs" className="nav nav-tabs tab-cards">
                <Nav.Item>
                  <Nav.Link eventKey="buy">Buy</Nav.Link>
                </Nav.Item>
                <Nav.Item>
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
                  <form method="post">
                    <div className="search-wrapper">
                        <input type="text" className="form-control" placeholder="Search Properties to own..." name="sidebar-search" />
                        <i className="flaticon-search"></i>
                        <button type="submit" className="btn-custom" name="button"> Search</button>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={typelist} options={{
                            placeholder: 'Property Types',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (min)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (max)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                        <Select2 data={pricerangelist} options={{
                          placeholder: 'Price (min)',
                          }} />
                    </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2 data={maxpricerangelist} options={{
                            placeholder: 'Price (max)',
                          }} />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select" style={{marginTop:20}}>
                          <input type="checkbox" />
                          <label style={{marginLeft:2, marginRight:0}}>Surrounding suburbs</label>
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
                        <input type="text" className="form-control" placeholder="Search properties to rent..." name="sidebar-search" />
                        <i className="flaticon-search"></i>
                        <button type="submit" className="btn-custom" name="button"> Search</button>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={typelist} options={{
                            placeholder: 'Property Types',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (min)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (max)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                        <Select2 data={pricerangelist} options={{
                          placeholder: 'Price (min)',
                          }} />
                    </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2 data={maxpricerangelist} options={{
                            placeholder: 'Price (max)',
                          }} />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select" style={{marginTop:20}}>
                          <input type="checkbox" />
                          <label style={{marginLeft:2, marginRight:0}}>Surrounding suburbs</label>
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
                        <input type="text" className="form-control" placeholder="Search for sold properties..." name="sidebar-search" />
                        <i className="flaticon-search"></i>
                        <button type="submit" className="btn-custom" name="button"> Search</button>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={typelist} options={{
                            placeholder: 'Property Types',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (min)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (max)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                        <Select2 data={pricerangelist} options={{
                          placeholder: 'Price (min)',
                          }} />
                    </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2 data={maxpricerangelist} options={{
                            placeholder: 'Price (max)',
                          }} />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select" style={{marginTop:20}}>
                          <input type="checkbox" />
                          <label style={{marginLeft:2, marginRight:0}}>Surrounding suburbs</label>
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
                        <input type="text" className="form-control" placeholder="Find agents here..." name="sidebar-search" />
                        <i className="flaticon-search"></i>
                        <button type="submit" className="btn-custom" name="button"> Search</button>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={typelist} options={{
                            placeholder: 'Property Types',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (min)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                          <Select2 data={bedslist} options={{
                            placeholder: 'Beds (max)',
                            }} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group acr-custom-select">
                        <Select2 data={pricerangelist} options={{
                          placeholder: 'Price (min)',
                          }} />
                    </div>
                      </div>
                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select">
                          <Select2 data={maxpricerangelist} options={{
                            placeholder: 'Price (max)',
                          }} />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-6">
                        <div className="form-group acr-custom-select" style={{marginTop:20}}>
                          <input type="checkbox" />
                          <label style={{marginLeft:2, marginRight:0}}>Surrounding suburbs</label>
                        </div>
                      </div>

                      
                  </div>
                </div>
              </div>
            </Tab.Pane>
            </Tab.Content>
        </div> {/* Col-lg-12 ends */}
      </Tab.Container>
    </div>
  </div>
  </div>

        );
    }
}

export default Banner;