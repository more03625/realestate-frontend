import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ctablock = [
    {
        id: 1,
        icon: 'sales-agent',
        title: 'Get property alert',
        text: "With thousands of properties for sale available on website Neprealestate can match you with the property that you want to call yours. Recive an email for new properties that match your search criteria",
        link: "/subscribe-for-alerts",
        linkText: "Subscribe for alerts"
    },
    {
        id: 2,
        icon: 'sold',
        title: 'Sell your property with confidence',
        text: "No listing fees, you get more when you list with Neprealestate. We will make your properties shine online to attract buyers. We are making it simpler to sell.",
        link: "/add-property",
        linkText: "Add property"
    }
]

const Blockcta = () => {
    return (
        <div className="container">
            <div className="row">
                {ctablock.map((item, i) => (
                    <div key={i} className="col-lg-6">
                        <div className={"cta cta-2 item" + item.id + ""}>
                            <i className={"flaticon-" + item.icon + ""} />
                            <div className="cta-body">
                                <h4>{item.title}</h4>
                                <p className="block-text">{item.text}</p>
                                <Link to={item.link} className="btn-custom btn-sm secondary" style={{ color: "#fff" }}>{item.linkText}
                                    <i className="fas fa-arrow-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blockcta;