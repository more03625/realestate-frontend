import React, { useEffect, useState, useRef } from 'react';
export default function Searchbar({ search, setFilterData, filterData }) {
    let autoComplete;

    const [query, setQuery] = useState("");

    function handleScriptLoad(updateQuery, autoCompleteRef) {
        const options = {
            componentRestrictions: { country: "np" },
        };
        autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, options);

        autoComplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);
        autoComplete.addListener("place_changed", () => {
            handlePlaceSelect(updateQuery)
        });
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        setFilterData({ ...filterData, 'search': query });
        // setMapAddress({ address: addressObject.formatted_address, latitude: addressObject.geometry.location.lat(), longitude: addressObject.geometry.location.lng() })
    }
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        handleScriptLoad(setQuery, autoCompleteRef);
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-12 form-group">
                    <input
                        ref={autoCompleteRef}
                        onChange={(e) => setQuery(e)}
                        type="text"
                        className="form-control"
                        placeholder="Search region, suburb or postcode"
                        defaultValue={filterData.search === undefined ? search : filterData.search}
                        name="search"
                    />
                </div>
            </div>
        </>
    )
}
