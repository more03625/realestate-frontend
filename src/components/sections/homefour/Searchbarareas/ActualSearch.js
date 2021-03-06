import React, { useState, useEffect, useRef } from 'react';

import {
    NavLink,
    Tab,
    Nav,
} from "react-bootstrap";
import { BuyArea, RentArea, SoldArea, ShareArea, FindAgents } from "./SearchInputArea";
export const ActualSearch = () => {
    var propertyType = window.location.pathname.split("/")[1];

    const setButtonClicked = (e) => {
        console.log(e)
        alert(e)
    }

    const handleSelect = (e) => {
        if (e === 'consultants') return
        window.location.href = '/' + e;
    }

    let autoComplete;

    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const options = {
        componentRestrictions: { country: "np" },
    };
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, options);

    return (
        <>
            <div className="sidebar sidebar-left">
                <div className="sidebar-widget">
                    <Nav variant="tabs" defaultActiveKey="buy" className="nav nav-tabs tab-cards" onSelect={(e) => handleSelect(e)}>
                        <Nav.Item>
                            <Nav.Link eventKey="buy" >Buy</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rent">Rent</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="sold">Sold</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="share">Share</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="consultants">Find Agents</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
            <Tab.Content className="m-0">
                <Tab.Pane eventKey="buy">
                    {propertyType == 'buy' || propertyType == 'home' ? <BuyArea autoRef={autoCompleteRef} setQuery={setQuery} setButtonClicked={setButtonClicked} /> : ''}
                </Tab.Pane>
                <Tab.Pane eventKey="rent">
                    {propertyType == 'rent' && <RentArea autoRef={autoCompleteRef} setQuery={setQuery} />}
                </Tab.Pane>
                <Tab.Pane eventKey="sold">
                    {propertyType == 'sold' && <SoldArea autoRef={autoCompleteRef} setQuery={setQuery} />}
                </Tab.Pane>
                <Tab.Pane eventKey="share">
                    {propertyType == 'share' && <ShareArea autoRef={autoCompleteRef} setQuery={setQuery} />}
                </Tab.Pane>
                <Tab.Pane eventKey="consultants">
                    <FindAgents />
                </Tab.Pane>
            </Tab.Content>
        </>
    )
}