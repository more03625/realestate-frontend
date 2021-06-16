import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Footercontent from './Footercontent';

class Footerthree extends Component {
    render() {
        return (
            <footer className="acr-footer footer-dark">
                <Footercontent/>
            </footer>
        );
    }
}

export default Footerthree;