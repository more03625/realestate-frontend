import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import Findhome from './Findhome';
import Services from './Services';
import Recentlistings from './Recentlistings';
import Whyus from './Whyus';
import Bluecta from '../../layouts/Bluecta';
import Contactform from './Contactform';
import Blockcta from '../../layouts/Blockcta';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <Categories />
                {/* {console.log(setLoginStatus())} */}
                <div className="section section-padding pt-0">
                    <Blockcta />
                </div>
                <Findhome />
                <Services />
                <Recentlistings />
                <Whyus />
                <div className="section pt-0">
                    <Bluecta />
                </div>
                <Contactform />
            </Fragment>
        );
    }
}

export default Content;