import Select2 from "react-select2-wrapper";

import {
    pricerangelist, options

} from "../../../../data/select.json";
import Axios from "axios";
import { Endpoints, Host } from "../../../../helper/comman_helper";
import { useEffect, useRef, useState } from "react";

import testdata from "../../../../data/testdata.json";
export const Searchoptions = () => {
    const [optionsData, setOptionsData] = useState();
    const [suburbs, setSuburbs] = useState();

    var propertyType = window.location.pathname.split("/")[1];
    if (propertyType === 'home') {
        propertyType = 'buy'
    }

    const getSubCategories = async () => {
        var url = Host + Endpoints.getSubCategories;
        var result = await Axios.get(url);

        if (result.data.error === true) {
            console.log('there are some erros');
        } else {
            var subCategoryName = [];
            for (var i = 0; i < result.data.data.categories.length; i++) {
                if (propertyType === 'sold') {
                    subCategoryName.push({ 'id': result.data.data.categories[i].id, text: result.data.data.categories[i].name });
                }
                else if (propertyType === result.data.data.categories[i].type) {
                    subCategoryName.push({ 'id': result.data.data.categories[i].id, text: result.data.data.categories[i].name });
                }
            }
            setOptionsData({ ...optionsData, 'categories': subCategoryName });
        }
    }

    const hideOptions = (e) => {

        if (e.target.value == 4) {
            for (var i = 0; i < 2; i++) {
                console.log("In IF")

                document.getElementsByClassName("hideBeds")[i].classList.add("d-none");
            }
        } else {
            for (var i = 0; i < 2; i++) {
                document.getElementsByClassName("hideBeds")[i].classList.remove("d-none");
            }
        }
    }
    useEffect(() => {
        getSubCategories();
    }, [])

    const beds = [
        { text: "Any", id: 0 },
        { text: "1 Bed", id: 1 },
        { text: "2 Beds", id: 2 },
        { text: "3 Beds", id: 3 },
        { text: "4 Beds", id: 4 },
        { text: "5 Beds", id: 5 },
    ];
    return (
        <>
            <div className="col-lg-2 col-md-6 col-6">
                <div className="form-group acr-custom-select">
                    <select className="form-control" id='testSelect1' multiple>
                        <option type="checkbox" value='House' selected>House</option>
                        <option type="checkbox" value='unit apartment'>Apartment & Unit</option>
                        <option type="checkbox" value='Townhouse'>Townhouse</option>
                        <option type="checkbox" value='Villa'>Villa</option>
                        <option type="checkbox" value='Land'>Land</option>
                        <option type="checkbox" value='Acreage'>Acreage</option>
                        <option type="checkbox" value='Rural'>Rural</option>
                        <option type="checkbox" value='unitblock'>Block of Units</option>
                        <option type="checkbox" value='retire'>Retirement Living</option>
                    </select>
                    <Select2
                        data={optionsData && optionsData.categories}
                        options={{
                            placeholder: "Property Types",
                        }}
                        name="subcategory_id"
                        multiple
                        onChange={(e) => hideOptions(e)}
                    />

                </div>
            </div>
            <div className="hideif col-lg-2 col-md-6 col-6 hideBeds">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={beds}
                        options={{
                            placeholder: "Beds (min)",
                        }}
                        name="min_beds"
                    />
                </div>
            </div>
            <div className="hideif col-lg-2 col-md-6 col-6 showInputArea d-none">
                <div className="form-group acr-custom-select">
                    <input type="number" name="area_size" tabIndex="4" className="searBarInput rui-input" min="0" max="999999" placeholder="Enter Size" />
                </div>
            </div>
            <div className=" col-lg-2 col-md-6 col-6 hideBeds">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={beds}
                        options={{
                            placeholder: "Beds (max)",
                        }}
                        name="max_beds"

                    />
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={pricerangelist}
                        options={{
                            placeholder: "Price (min)",
                        }}
                        name="min_price"

                    />
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={pricerangelist}
                        options={{
                            placeholder: "Price (max)",
                        }}
                        name="max_price"

                    />

                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
                <div
                    className="form-group acr-custom-select"
                    style={{ marginTop: 20 }}
                >
                    <input type="checkbox" name="suburbs" value="1" />
                    <label style={{ marginLeft: 2, marginRight: 0 }}>
                        Surrounding suburbs
                    </label>
                </div>
            </div>
        </>
    )
}

export const SearchButton = () => {
    const handleButtonClicked = (e) => {
        e.preventDefault();
        alert("Button Clicked")
    }

    return (
        <>
            <i className="flaticon-search"></i>
            <button type="submit" className="btn-custom" >
                {" "}
                Search
            </button>
        </>
    )
}