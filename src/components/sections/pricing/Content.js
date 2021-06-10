import React, { Component, Fragment } from 'react';
import Faq from './Faq';
import Pricebox from './Pricebox';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Pricebox/>
                <Faq/>
            </Fragment>
        );
    }
}

export default Content;