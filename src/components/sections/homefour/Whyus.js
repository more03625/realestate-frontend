import React, { Component } from 'react';

const whyusblock = [
    {
        id: 1,
        icon: "star",
        title: "Various Properties",
        text: "We have various types of properties you can choose that from category, subcategory"
    },
    {
        id: 2,
        icon: "apartment",
        title: "Unlimited Listings",
        text: "Nep Real Estate brings the real estate market to your fingertips."
    },
    {
        id: 3,
        icon: "sales-agent",
        title: "Great Support",
        text: "World class support system."
    }
]

class Whyus extends Component {
    render() {
        return (
            <div className="section section-padding infographics-3">
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Our Moto</h5>
                        <h2 className="title">Why Choose Us</h2>
                    </div>
                    <div className="row">
                        {whyusblock.map((item, i) => (
                            <div key={i} className="col-lg-4">
                                <div className="acr-infographic-item">
                                    <i className={"flaticon-" + item.icon + ""} />
                                    <div className="acr-infographic-item-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Whyus;