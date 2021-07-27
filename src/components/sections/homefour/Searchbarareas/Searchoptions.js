import Select2 from "react-select2-wrapper";

import {
    pricerangelist,
    bedslist,
    category,
    maxpricerangelist,
} from "../../../../data/select.json";
import Axios from "axios";
import { Endpoints, Host } from "../../../../helper/comman_helper";
import { useEffect, useState } from "react";

export const Searchoptions = () => {

    const [optionsData, setOptionsData] = useState();

    const getSubCategories = async () => {
        var url = Host + Endpoints.getSubCategories;
        var result = await Axios.get(url);

        if (result.data.error === true) {
            console.log('there are some erros');
        } else {
            var subCategoryName = [];
            for (var i = 0; i < result.data.data.categories.length; i++) {
                subCategoryName.push(result.data.data.categories[i])
            }

            setOptionsData({ ...optionsData, 'categories': subCategoryName });

        }
    }
    useEffect(() => {
        getSubCategories();
    }, []);



    var propertyTypes = {};
    if (optionsData && optionsData !== undefined) {
        optionsData.categories.forEach(function (category, index) {
            propertyTypes[category.id] = category.name;
        });
        // console.log(propertyTypes);
        // propertyTypes.forEach(function (value, i) {
        //     console.log(value);
        // });
    }
    const ptypes = [
        { text: "All types", id: 1 },
        { text: "House", id: 2 },
        { text: "Apartment Unit", id: 3 },
        { text: "Land", id: 4 },
        { text: "Shop", id: 5 },
        { text: "Flat", id: 6 },
        { text: "Townhouse", id: 7 },
        { text: "Villa", id: 8 },
        { text: "Acreage", id: 9 },
        { text: "Rural", id: 10 },
        { text: "Block of Units", id: 11 },
        { text: "Retirement Livin", id: 12 }
    ];
    const beds = [
        { text: "Any", id: 1 },
        { text: "1 Bed", id: 2 },
        { text: "2 Beds", id: 3 },
        { text: "3 Beds", id: 4 },
        { text: "4 Beds", id: 5 },
        { text: "5 Beds", id: 6 },
    ];
    return (
        <>
            <div className="col-lg-2 col-md-6">
                <div className="form-group acr-custom-select">

                    <Select2
                        data={ptypes}
                        options={{
                            placeholder: "Property Types",
                        }}
                        name="subcategory"
                    />

                </div>
            </div>
            <div className="col-lg-2 col-md-6">
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
            <div className="col-lg-2 col-md-6">
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
            <div className="col-lg-2 col-md-6">
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
            <div className="col-lg-2 col-md-6">
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
        </>
    )
}

export const SearchButton = () => {
    return (
        <>
            <i className="flaticon-search"></i>
            <button type="submit" className="btn-custom">
                {" "}
                Search
            </button>
        </>
    )
}