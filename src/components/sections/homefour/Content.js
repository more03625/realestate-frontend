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
import Latestblog from './Latestblog';

const Content = () => {

    const [subCategoriesWithCount, setSubCategoriesWithCount] = useState([]);
    const [recentNews, setRecentNews] = useState([]);


    function getRecentNews() {
        var url = Host + Endpoints.getRecentNews + "?type=" + window.location.pathname.split("/")[1];
        Axios.get(url)
            .then((response) => {
                if (response.data.error === false) {

                    setRecentNews(response.data.data); //object
                }
            })
            .catch((errors) => {
                console.log(errors);
            });
    }

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
        getRecentNews();
        getSubCategories();
    }, [])
    return (
        <Fragment>
            <Banner />
            <Categories />
            {/* {console.log(setLoginStatus())} */}
            <div className="section section-padding pt-0">
                <Blockcta />
            </div>
            {
                recentNews.length > 0 ? <Latestblog recentNews={recentNews} /> : ''
            }

            {/*<Findhome categories={subCategoriesWithCount} />*/}
            {/*<Services />*/}
            <Recentlistings />
            {/* <Whyus />
            <div className="section pt-0">
                <Bluecta />
            </div>
            */}


            <Contactform />
        </Fragment>
    );
}

export default Content;