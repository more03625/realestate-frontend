import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import Blockcta from '../../layouts/Blockcta';
import App from '../../layouts/App';
import Recentlistings from './Recentlistings';
import Latestblog from '../home/Latestblog';
import Faqs from './Faqs';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <Categories />
                <div className="section section-padding pt-0">
                    <Blockcta />
                </div>
                <div className="acr-footer footer-2">
                    <App />
                </div>
                <Recentlistings/>
                <Latestblog/>
                <Faqs/>
            </Fragment>
        );
    }
}

export default Content;