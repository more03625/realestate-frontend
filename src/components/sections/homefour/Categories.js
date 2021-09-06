import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type } from '../../../data/category.json'
import { Collapse, Button, Modal, Tabs, Tab } from "react-bootstrap";
import Axios from 'axios';
import { Endpoints, Host, lowercaseFirstLetter } from '../../../helper/comman_helper';
import listing from "../../../data/typedata.json";

const Categories = () => {
    const [value, setValue] = useState();

    const [categories, setCategories] = useState([]);
    const [subCategoriesWithCount, setSubCategoriesWithCount] = useState([]);
    var services = window.location.pathname.split("/")[1] === 'home' ? 'buy' : window.location.pathname.split("/")[1];

    const getCategories = async () => {
        var url = Host + Endpoints.getCategories;
        var result = await Axios.get(url);
        if (result.data.error === true) {
            alert("There are some errors!");
        } else {
            setCategories(result.data.data.categories);
        }
    }
    const getSubCategories = (categoryID = 1) => {
        var url = Host + Endpoints.getPropertyCounts + categoryID;
        Axios.get(url).then((response) => {
            if (response.data.error === true) {
                alert("There are some errors!")
            } else {
                setSubCategoriesWithCount(response.data.data);
            }
        });
    }
    const handleSelect = (categoryID) => {
        getSubCategories(categoryID)
    }
    useEffect(() => {
        getCategories();
        getSubCategories();
    }, []);
    return (
        <div className="section section-padding">
            <div className="container">

                {
                    services == 'buy' ? (
                        <>
                            <div className="section-title-wrap section-header"><h5 className="custom-primary">Categories</h5><h2 className="title">Browse By Category</h2></div>
                            <Tabs className="justify-content-center" defaultActiveKey={categories && categories[0] && categories[0].id} onSelect={(e) => handleSelect(e)} id="uncontrolled-tab-example" >
                                {categories &&
                                    categories.map((value, index) => (
                                        <Tab key={index} eventKey={value.id} title={value.name} >
                                            <div className="row">
                                                {subCategoriesWithCount && subCategoriesWithCount.map((item, i) => (
                                                    <div key={i} className="col-lg-4 col-md-6">
                                                        <div className="acr-category">
                                                            <div className="acr-category-thumb" >
                                                                <i className={"flaticon-company"} />
                                                                <Link to={`/property-results?sub_category=${item.name.toLowerCase()}&subcategory_id=${item.id}`}>
                                                                    <img className="rounded" src={process.env.REACT_APP_CONTENT_URL + item.image + ".jpg"} alt="category" />
                                                                </Link>
                                                                <div className="acr-category-body">
                                                                    <h5> <Link to={`/property-results?sub_category=${item.name.toLowerCase()}&subcategory_id=${item.id}`}>{item.title}</Link> </h5>
                                                                    <span>{item.numberofitem} {item.name} ( {item.count} Properties) </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Tab>
                                    ))
                                }
                            </Tabs>
                        </>
                    ) : (
                        <>
                            {
                                services === 'buy' || services === 'rent' || services === 'share' || services === 'sold' ? (

                                    <>
                                        <div className="row infographics-5">
                                            {listing[services].slice(0, 3).map((item, i) => (
                                                <div key={i} className="col-lg-4">
                                                    <Link target={item.targetBlank} to={{ pathname: item.link }}>
                                                        <div className="acr-infographic-item" style={{ backgroundColor: "#fff" }}>
                                                            <img className="services" alt="test" src="https://www.realestate.com.au/assets/img/rent/1511759973236.33754e25192e84aafe6fa68843001e6e.png" />
                                                            <div className="acr-infographic-item-body">
                                                                <h5>{item.title}</h5>
                                                                <p>{item.description}</p>
                                                                <h6 className="listing-text"><Link target={item.targetBlank} to={{ pathname: item.link }}>{item.linkText}</Link></h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>

                                    </>


                                ) : ("")
                            }
                        </>
                    )
                }




            </div>

        </div>
    );
}

export default Categories;