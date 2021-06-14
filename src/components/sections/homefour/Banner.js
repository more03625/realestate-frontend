import React, { Component } from 'react';
import { locationlist, statuslist, pricerangelist, bedslist, bathroomslist, typelist, diameterlist } from '../../../data/select.json';
import Select2 from 'react-select2-wrapper';
import classNames from 'classnames';

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
            // <div className="banner banner-1 banner-3 dark-overlay bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)" }}>
            //     <div className="container">
            //         <div className="banner-item">
            //             <div className="banner-inner">
            //                 <div className="banner-text">
            //                     <h1 className="title text-white">Find Your Ideal Home Today</h1>
            //                     <p className="subtitle text-white">Thousands of people have their flats up for grabs. Don't miss your chance to grab your own house today.</p>
            //                 </div>
            //                 <div className="acr-filter-form">
            //                     <form method="post">
            //                         <div className="row">
            //                             <div className="col-lg-3 col-md-6">
            //                                 <div className="form-group acr-custom-select">
            //                                     <label>Location: </label>
            //                                     <Select2 data={locationlist} options={{
            //                                         placeholder: 'Any Location',
            //                                     }} />
            //                                 </div>
            //                             </div>
            //                             <div className="col-lg-3 col-md-6">
            //                                 <div className="form-group acr-custom-select">
            //                                     <label>Status: </label>
            //                                     <Select2 data={statuslist} options={{
            //                                         placeholder: 'Any Status',
            //                                     }} />
            //                                 </div>
            //                             </div>
            //                             <div className="col-lg-4 col-md-6">
            //                                 <div className="form-group acr-custom-select">
            //                                     <label>Price Range: </label>
            //                                     <Select2 data={pricerangelist} options={{
            //                                         placeholder: 'Any Range',
            //                                     }} />
            //                                 </div>
            //                             </div>
            //                             <div className="submit-btn col-lg-2 col-md-6">
            //                                 <div className="form-group">
            //                                     <button type="submit" className="btn-custom secondary btn-block" name="button">Search listings</button>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div className={classNames("advanced-search", { "d-block": this.state.advancesearch })}>
            //                             <div className="row">
            //                                 <div className="col-lg-3 col-md-6">
            //                                     <div className="acr-custom-select form-group">
            //                                         <label>Beds: </label>
            //                                         <Select2 data={bedslist} options={{
            //                                             placeholder: 'Any amount',
            //                                         }} />
            //                                     </div>
            //                                 </div>
            //                                 <div className="col-lg-3 col-md-6">
            //                                     <div className="acr-custom-select form-group">
            //                                         <label>Bathrooms: </label>
            //                                         <Select2 data={bathroomslist} options={{
            //                                             placeholder: 'Any amount',
            //                                         }} />
            //                                     </div>
            //                                 </div>
            //                                 <div className="col-lg-3 col-md-6">
            //                                     <div className="acr-custom-select form-group">
            //                                         <label>Type: </label>
            //                                         <Select2 data={typelist} options={{
            //                                             placeholder: 'Any Type',
            //                                         }} />
            //                                     </div>
            //                                 </div>
            //                                 <div className="col-lg-3 col-md-6">
            //                                     <div className="acr-custom-select form-group">
            //                                         <label>Diameter: </label>
            //                                         <Select2 data={diameterlist} options={{
            //                                             placeholder: 'Any Range',
            //                                         }} />
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </form>
            //                     <div className={classNames("advanced-search-trigger semi-circle", { "active": this.state.advancesearch })} onClick={this.advancetoggle}>
            //                         <i className="fas fa-chevron-down" />
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>


            <div className="subheader bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)" }}>
    <div className="container">
        <div className="row search-form-container">
        {/* <!-- Agency Sidebar End --> */}

        {/* <!-- Agent Tabs Start --> */}
        <div className="col-lg-12">
          <h5 className="text-white">Search properties for sale</h5>
           <div className="sidebar sidebar-left">
            <div className="sidebar-widget">
              <ul className="nav nav-tabs tab-cards" id="brokerDetailsTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="false">Buy</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="listings-tab" data-toggle="tab" href="#listings" role="tab" aria-controls="listings" aria-selected="true">Rent</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="agents-tab" data-toggle="tab" href="#agents" role="tab" aria-controls="agents" aria-selected="false">Sold</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="agents-tab" data-toggle="tab" href="#agents" role="tab" aria-controls="agents" aria-selected="false">Property value</a>
                </li>
                   <li className="nav-item">
                  <a className="nav-link" id="agents-tab" data-toggle="tab" href="#agents" role="tab" aria-controls="agents" aria-selected="false">Find agents</a>
                </li>
              </ul>
            </div>
           </div>

          <div className="tab-content m-0" id="brokerDetailsTabContent">

            {/* <!-- Overview Tab Start --> */}
            <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
              <div className="agency-content">
                <div className="sidebar-widget">
              <form method="post">
              <div className="search-wrapper">
                  <input type="text" className="form-control" placeholder="Search by state, suburb or postcode" name="sidebar-search" />
                  <i className="flaticon-search"></i>
                  <button type="submit" className="btn-custom" name="button"> Search</button>
                </div>
              </form>

              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="form-group acr-custom-select">
                  <select className="acr-select2" name="location">
                      <option value="All property types" >All property types</option>
                      <option value="*">Any Location</option>
                      <option value="California, CA">California, CA</option>
                      <option value="Lawndale, CA">Lawndale, CA</option>
                      <option value="Stroudsburg, PA">Stroudsburg, PA</option>
                      <option value="West Roxbury, MA">West Roxbury, MA</option>
                      <option value="Ponte Vedra Beach, FL">Ponte Vedra Beach, FL</option>
                      <option value="Fort Worth, TX">Fort Worth, TX</option>
                      <option value="Willingboro, NJ">Willingboro, NJ</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                   <select className="acr-select2" name="status">
					 <option value="">Beds (min)</option>
                      <option value="*">Any Status</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Featured">Featured</option>
                      <option value="For Sale">For Sale</option>
                      <option value="Leased">Leased</option>
                      <option value="New Addition">New Addition</option>
                      <option value="Sold">Sold</option>
                      <option value="Rental">Rental</option>
                      <option value="Reduced">Reduced</option>
                      <option value="Special Offer">Special Offer</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Beds (max)</option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Price (min): </option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Price (max): </option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                
              </div>

            </div>
              </div>
            </div>
            {/* <!-- Overview Tab End --> */}

            {/* <!-- Listings Tab Start --> */}
            <div className="tab-pane fade" id="listings" role="tabpanel" aria-labelledby="listings-tab">
               <div className="sidebar-widget">
             <form method="post">
              <div className="search-wrapper">
                  <input type="text" className="form-control" placeholder="Search by state, suburb or postcode" name="sidebar-search" />
                  <i className="flaticon-search"></i>
                  <button type="submit" className="btn-custom" name="button"> Search</button>
                </div>
              </form>

                <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="form-group acr-custom-select">
                  <select className="acr-select2" name="location">
                      <option value="All property types" >All property types</option>
                      <option value="*">Any Location</option>
                      <option value="California, CA">California, CA</option>
                      <option value="Lawndale, CA">Lawndale, CA</option>
                      <option value="Stroudsburg, PA">Stroudsburg, PA</option>
                      <option value="West Roxbury, MA">West Roxbury, MA</option>
                      <option value="Ponte Vedra Beach, FL">Ponte Vedra Beach, FL</option>
                      <option value="Fort Worth, TX">Fort Worth, TX</option>
                      <option value="Willingboro, NJ">Willingboro, NJ</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                   <select className="acr-select2" name="status">
					 <option value="">Beds (min)</option>
                      <option value="*">Any Status</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Featured">Featured</option>
                      <option value="For Sale">For Sale</option>
                      <option value="Leased">Leased</option>
                      <option value="New Addition">New Addition</option>
                      <option value="Sold">Sold</option>
                      <option value="Rental">Rental</option>
                      <option value="Reduced">Reduced</option>
                      <option value="Special Offer">Special Offer</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Beds (max)</option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Price (min): </option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Price (max): </option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                
              </div>

            </div>

            </div>
            {/* <!-- Listings Tab End --> */}

            {/* <!-- Agents Tab Start --> */}
            <div className="tab-pane fade" id="agents" role="tabpanel" aria-labelledby="agents-tab">
               <div className="sidebar-widget">
              <form method="post">
              <div className="search-wrapper">
                  <input type="text" className="form-control" placeholder="Search by state, suburb or postcode" name="sidebar-search" />
                  <i className="flaticon-search"></i>
                  <button type="submit" className="btn-custom" name="button"> Search</button>
                </div>
              </form>

                <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="form-group acr-custom-select">
                  <select className="acr-select2" name="location">
                      <option value="All property types" >All property types</option>
                      <option value="*">Any Location</option>
                      <option value="California, CA">California, CA</option>
                      <option value="Lawndale, CA">Lawndale, CA</option>
                      <option value="Stroudsburg, PA">Stroudsburg, PA</option>
                      <option value="West Roxbury, MA">West Roxbury, MA</option>
                      <option value="Ponte Vedra Beach, FL">Ponte Vedra Beach, FL</option>
                      <option value="Fort Worth, TX">Fort Worth, TX</option>
                      <option value="Willingboro, NJ">Willingboro, NJ</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                   <select className="acr-select2" name="status">
					 <option value="">Beds (min)</option>
                      <option value="*">Any Status</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Featured">Featured</option>
                      <option value="For Sale">For Sale</option>
                      <option value="Leased">Leased</option>
                      <option value="New Addition">New Addition</option>
                      <option value="Sold">Sold</option>
                      <option value="Rental">Rental</option>
                      <option value="Reduced">Reduced</option>
                      <option value="Special Offer">Special Offer</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Beds (max)</option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Price (min): </option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group acr-custom-select">
                    <select className="acr-select2" name="price">
                      <option value="">Price (max): </option>
                      <option value="*">Any Range</option>
                      <option value="$60k - $80k">$60k - $80k</option>
                      <option value="$80k - $100k">$80k - $100k</option>
                      <option value="$100k - $120k">$100k - $120k</option>
                      <option value="$120k - $140k">$120k - $140k</option>
                      <option value="$140k - $160k">$140k - $160k</option>
                      <option value="$160k - $180k">$160k - $180k</option>
                      <option value="$180k - $200k">$180k - $200k</option>
                    </select>
                  </div>
                </div>
                
              </div>

            </div>

            </div>
            {/* <!-- Agents Tab End --> */}

          </div>

        </div>
        {/* <!-- Agent Tabs End --> */}

      </div>
    </div>
  </div>
  // {/* <!-- Subheader End --> */}
        );
    }
}

export default Banner;