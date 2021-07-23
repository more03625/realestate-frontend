import Select2 from "react-select2-wrapper";

import {
    pricerangelist,
    bedslist,
    category,
    maxpricerangelist,
} from "../../../../data/select.json";
export const Searchoptions = () => {
    return (
        <>
            <div className="col-lg-2 col-md-6">
                <div className="form-group acr-custom-select">
                    <Select2
                        data={category}
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