import React, { useState } from 'react'
import {
    bedslist,
    bathroomslist,
    carspaces,
    addAreaUnit,
    pricerangelist
} from "../../data/select.json";
export default function FilterModal({ tabName, setFilterData, filterData, selectedIndoorFeatures, selectedOutdoorFeatures, selectedClimateFeatures, setSelectedIndoorFeatures, setSelectedOutdoorFeatures, setSelectedClimateFeatures, setSelectedM, selectedM, subCategories, indoorFeatures, outdoorFeatures, climateControlFeatures }) {

    const queryParams = new URLSearchParams(window.location.search);
    var search = queryParams.get("search");
    var property_type = queryParams.get("property_type");
    var minBed = queryParams.get("min_beds");
    var maxBed = queryParams.get("max_beds");
    var minPrice = queryParams.get("min_price");
    var maxPrice = queryParams.get("max_price");
    var subCategoryID = queryParams.get("subcategory_id");
    var subCategoryName = queryParams.get("sub_category");
    var suburbs = queryParams.get("suburbs");
    var defaultAreaUnit = queryParams.get("default_area_unit");
    var area = queryParams.get("area");

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
    const [placeholder, setPlaceHolder] = useState(null);
    const handleChange = (e) => {

        if (e.target.name === 'default_area_unit' && e.target.value === 'Bigha-Kattha-Dhur-Haat' || e.target.value === 'Ropani-Aana-Paisa-Daam') {
            setPlaceHolder(`0-4-2-0 ${e.target.value}`);
        } else if (e.target.name === 'default_area_unit' && e.target.value === 'sqmt' || e.target.value === 'sqft') {
            setPlaceHolder(`1000 ${e.target.value}`);
        } else if (e.target.name === 'default_area_unit' && e.target.value === 'acres') {
            setPlaceHolder('2 Acres');
        }
        setFilterData({ ...filterData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <form className="filter_form">
                <div className="col-md-12">
                    <div className="row">
                        <h5>Subcategory</h5>
                    </div>

                    {/*defaultChecked={selectedM.indexOf(value.id) > -1 ? true : false}*/}
                    <div className="row">
                        {subCategories &&
                            subCategories.map((value, index) => (
                                <div key={index} className="custom-control custom-checkbox col-lg-6 col-md-6">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={value.name + index + tabName}
                                        onChange={(e) => onChangeSubcategory(value.id)}
                                        selected={selectedM.includes(value.id)}
                                        defaultChecked={selectedM.indexOf(value.id) > -1 ? true : false}
                                    />
                                    <label className="custom-control-label" htmlFor={value.name + index + tabName}>
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
                                    value={
                                        filterData.min_price !== undefined ? filterData.min_price : minPrice !== undefined ? minPrice : ''
                                    }
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
                                    value={
                                        filterData.max_price !== undefined ? filterData.max_price : maxPrice !== undefined ? maxPrice : ''
                                    }
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
                                    name="min_beds"
                                    onChange={(e) => handleChange(e)}
                                    value={
                                        filterData.min_beds !== undefined ? filterData.min_beds : minBed !== undefined ? minBed : ''
                                    }

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
                                    name="max_beds"
                                    onChange={(e) => handleChange(e)}
                                    value={
                                        filterData.max_beds !== undefined ? filterData.max_beds : maxBed !== undefined ? maxBed : ''
                                    }
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
                                    value={
                                        filterData.min_bathrooms !== undefined ? filterData.min_bathrooms : ''
                                    }
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
                                    value={
                                        filterData.car_spaces !== undefined ? filterData.car_spaces : ''
                                    }
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
                                    name="default_area_unit"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="">Any</option>
                                    {addAreaUnit &&
                                        addAreaUnit.map((value, index) => (
                                            <option key={index} value={value}>{value}</option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Area Size</label>
                                <input className="form-control" name="area" placeholder={placeholder} onChange={(e) => handleChange(e)} />
                                <span className="acr-form-notice">Format: {placeholder} </span>
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
                                    value={
                                        filterData.build_type !== undefined ? filterData.build_type : ''
                                    }
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
                                            id={value.feature + tabName}
                                            onChange={(e) => onChangeIndoorFeatures(value.id)}
                                            defaultChecked={selectedIndoorFeatures.indexOf(value.id) > -1 ? true : false}

                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor={value.feature + tabName}
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
                                            id={value.feature + tabName}
                                            onChange={(e) => onChangeOutdoorFeatures(value.id)}
                                            defaultChecked={selectedOutdoorFeatures.indexOf(value.id) > -1 ? true : false}

                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor={value.feature + tabName}
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
                                            id={value.feature + tabName}
                                            onChange={(e) => onChangeClimetFeatures(value.id)}
                                            defaultChecked={selectedClimateFeatures.indexOf(value.id) > -1 ? true : false}

                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor={value.feature + tabName}
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
        </>
    )
}
