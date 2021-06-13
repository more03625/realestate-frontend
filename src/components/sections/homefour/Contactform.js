import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Formbox from '../../layouts/Formbox';
import contactinfo from '../../../data/contactinfo.json';

class Contactform extends Component {
    render() {
        return (
            <div className="section pt-0">
                <div className="container">
                    <div className="row infographics-5">
                        {contactinfo.map((item, i) => (
                            <div key={i} className="col-lg-4">
                                <div className="acr-infographic-item">
                                    <i className={"flaticon-" + item.icon + ""} />
                                    <div className="acr-infographic-item-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                        <Link to={item.btnurl} className="btn-custom calltoaction secondary btn-sm">{item.btntext}</Link>
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

export default Contactform;