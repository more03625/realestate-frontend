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
    console.log(optionsData)
    console.log(optionsData && optionsData.categories.name);
    console.log(optionsData && optionsData.categories.id);
    return (
        <>
            <div className="col-lg-2 col-md-6">
                <div className="form-group acr-custom-select">
                    {optionsData &&

                        <Select2
                            data={[
                                { text: optionsData.categories.name, id: optionsData.categories.id }
                            ]}
                            options={{
                                placeholder: "Property Types",
                            }}
                            name="subcategory"
                        />

                    }
                </div>
            </div>
            <div className="col-lg-2 col-md-6">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={bedslist}
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
                        data={bedslist}
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
                        data={[
                            maxpricerangelist
                        ]}
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