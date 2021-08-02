import Select2 from "react-select2-wrapper";

import {
    pricerangelist,

} from "../../../../data/select.json";
import Axios from "axios";
import { Endpoints, Host } from "../../../../helper/comman_helper";
import { useEffect, useState } from "react";

export const Searchoptions = () => {

    const [optionsData, setOptionsData] = useState();
    const [suburbs, setSuburbs] = useState();


    const getSubCategories = async () => {
        var url = Host + Endpoints.getSubCategories;
        var result = await Axios.get(url);

        if (result.data.error === true) {
            console.log('there are some erros');

        } else {
            var subCategoryName = [];
            for (var i = 0; i < result.data.data.categories.length; i++) {
                subCategoryName.push({ 'id': result.data.data.categories[i].id, text: result.data.data.categories[i].name });
            }
            console.log(subCategoryName);
            setOptionsData({ ...optionsData, 'categories': subCategoryName });
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
            <div className="col-lg-2 col-md-6">
                <div className="form-group acr-custom-select">

                    <Select2
                        data={optionsData && optionsData.categories}
                        options={{
                            placeholder: "Property Types",
                        }}
                        name="subcategory_id"
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