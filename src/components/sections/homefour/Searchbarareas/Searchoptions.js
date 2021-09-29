import Select2 from "react-select2-wrapper";

import {
    pricerangelist

} from "../../../../data/select.json";
import Axios from "axios";
import { Endpoints, Host } from "../../../../helper/comman_helper";
import { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

export const Searchoptions = () => {
    const [optionsData, setOptionsData] = useState();
    const [selected, setSelected] = useState([]);

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
                    subCategoryName.push({ 'value': result.data.data.categories[i].id, label: result.data.data.categories[i].name });
                }
                else if (propertyType === result.data.data.categories[i].type) {
                    subCategoryName.push({ 'value': result.data.data.categories[i].id, label: result.data.data.categories[i].name });
                }
            }
            setOptionsData({ ...optionsData, 'categories': subCategoryName });
        }
    }

    useEffect(() => {
        getSubCategories();
    }, []);

    var s = [];

    selected.map((value, index) => {
        var elementIndex = s.indexOf(value.value);
        if (elementIndex !== -1) {
            s.splice(elementIndex, 1);
        } else {
            s.push(value.value)
        }

        if (value.label.toLocaleLowerCase() === 'land') {
            for (var i = 0; i < document.getElementsByClassName("beds-section").length; i++) {
                document.getElementsByClassName("beds-section")[i].classList.add("d-none");
                document.getElementsByClassName("area-section")[i].classList.remove("d-none");
            }
        } else {
            for (var i = 0; i < document.getElementsByClassName("beds-section").length; i++) {
                document.getElementsByClassName("beds-section")[i].classList.remove("d-none");
                document.getElementsByClassName("area-section")[i].classList.add("d-none");
            }
        }
    })
    const beds = [
        { text: "Any", id: 0 },
        { text: "1 Bed", id: 1 },
        { text: "2 Beds", id: 2 },
        { text: "3 Beds", id: 3 },
        { text: "4 Beds", id: 4 },
        { text: "5 Beds", id: 5 },
    ];
    const areaUnits = [
        { text: "sqmt", id: "sqmt" },
        { text: "sqft", id: "sqft" },
        { text: "acres", id: "acres" },
        { text: "Bigha-Kattha-Dhur-Haat", id: "Bigha-Kattha-Dhur-Haat" },
        { text: "Ropani-Aana-Paisa-Daam", id: "Ropani-Aana-Paisa-Daam" },
    ]
    return (
        <>
            <div className="col-lg-2 col-md-6">
                <div className="form-group acr-custom-select">
                    {
                        optionsData && optionsData.categories !== undefined ?

                            <MultiSelect
                                options={optionsData.categories}
                                value={selected}
                                onChange={setSelected}
                                labelledBy={"Select"}
                                name="subcat"
                                labelledBy="Select"
                            />
                            : ''
                    }
                    <input type="hidden" name="subcategory_id" value={s.toString()} />
                </div>
            </div>

            <div className="col-lg-2 col-md-6 col-6 beds-section">
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

            <div className=" col-lg-2 col-md-6 col-6 beds-section">
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

            <div className=" col-lg-2 col-md-6 col-6 area-section d-none">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={areaUnits}
                        options={{
                            placeholder: "Area Unit",
                        }}
                        name="default_area_unit"
                    />
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6 area-section d-none">
                <div className="form-group acr-custom-select">
                    <input type="text" name="area" tabIndex="4" className="searBarInput rui-input" min="0" max="999999" placeholder="Enter Size" />
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