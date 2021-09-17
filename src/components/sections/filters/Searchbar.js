import React, { useState, useRef } from 'react';
export default function Searchbar({ search }) {
    let autoComplete;

    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const options = {
        componentRestrictions: { country: "np" },
    };
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, options);
    autoComplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

    return (
        <>
            <div className="row">
                <div className="col-md-12 form-group">
                    <input
                        ref={autoCompleteRef}
                        onChange={event => setQuery(event.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Search region, suburb or postcode"
                        defaultValue={search !== '' ? search : ''}
                        name="search"
                    />
                </div>
            </div>
        </>
    )
}
