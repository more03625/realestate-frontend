import React, { Fragment, useEffect, useState } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import Findhome from './Findhome';
import Services from './Services';
import Recentlistings from './Recentlistings';
import Whyus from './Whyus';
import Bluecta from '../../layouts/Bluecta';
import Contactform from './Contactform';
import Blockcta from '../../layouts/Blockcta';
import { Host, Endpoints } from '../../../helper/comman_helper';
import Axios from 'axios';
const Content = () => {

    const [subCategoriesWithCount, setSubCategoriesWithCount] = useState([]);

    const getSubCategories = (categoryID = 1) => {
        var url = Host + Endpoints.getPropertyCounts + categoryID;
        Axios.get(url).then((response) => {
            if (response.data.error === true) {
                alert("There are some errors!")
            } else {

                setSubCategoriesWithCount(response.data.data);
            }
        });
    }
    useEffect(() => {
        getSubCategories();
    })
    return (
        <Fragment>
            <Banner />
            <Categories />
            {/* {console.log(setLoginStatus())} */}
            <div className="section section-padding pt-0">
                <Blockcta />
            </div>
            <Findhome categories={subCategoriesWithCount} />
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

export default Content;