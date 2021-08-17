import React, { Component, Fragment } from 'react';
import Agentsslider from '../home/Agentsslider';
import Testimonials from '../home/Testimonials';
import About from '../hometwo/About';
import Counter from './Counter';
import Video from './Video';

const Content = ({ setting }) => {

    return (
        <Fragment>
            <About setting={setting} />
            <Counter />
            <div className="section pb-0">
                <Agentsslider />
            </div>
            <Video />
            <Testimonials />
        </Fragment>
    );
}

export default Content;