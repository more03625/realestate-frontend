import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ctablock = [
    {
        id: 1,
        icon: 'sales-agent',
        title: 'Buying a Home?',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
        link: "/subscribe-for-alerts",
        linkText: "Subscribe for alerts"
    },
    {
        id: 2,
        icon: 'sold',
        title: 'Selling a Home?',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
        link: "/add-property",
        linkText: "Find out more"


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
                                <p>{item.text}</p>
                                <Link to={item.link} className="btn-link">{item.linkText}<i className="fas fa-arrow-right" /> </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blockcta;