import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Bluecta extends Component {
    render() {
        return (
            <div className="container">
                <div className="cta cta-1">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <h3>Need More Information On Real Estate?</h3>
                        </div>
                        <div className="offset-lg-1 col-lg-7">
                            <p>
                                Nep Real Estate is a premier online resource for finding homes for sale and rentals in Nepal. We
                                are building a next-generation collaborative marketplace to connect buyer, seller and agents,
                                and equip them with right tools at every step of the process.
                            </p>
                            <Link to="/contact" className="btn-custom-2 light">Find Out More</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bluecta;