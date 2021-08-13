import React, { useState, useRef, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import Axios from "axios";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Endpoints, Host, successToast, errorToast } from "../../../helper/comman_helper";


const images = [
    {
        img: "assets/img/coming-soon/1.jpg",
        title: "Quote of the day",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
        img: "assets/img/coming-soon/2.jpg",
        title: "Quote of the day",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
        img: "assets/img/coming-soon/3.jpg",
        title: "Quote of the day",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
];
const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: true,
    dotsClass: "d-flex slick-dots",
};
const errorStyle = {
    color: 'red',
    fontSize: '14px',
};
const successStyle = {
    color: '#28a745',
    fontSize: '14px',
};
const categories = [
    "Select Category",
    "Residential",
    "commercial"
];
const Content = () => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userDataError, setUserDataError] = useState([]);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const name = useRef();
    const email = useRef();
    const mobile = useRef();
    const category = useRef();
    const subcategory = useRef();
    const min_price = useRef();
    const max_price = useRef();
    const city = useRef();
    const state = useRef();

    const getStates = () => {
        var url = Host + Endpoints.getStates;
        Axios.get(url).then((response) => {
            setStates(response.data.data);
        });
    };
    const getCities = (stateID = '') => {
        var url = Host + Endpoints.getCities + stateID;
        Axios.get(url).then((response) => {
            setCities(response.data.data);
        });
    };
    const getSubCategories = async (id) => {
        var url = Host + Endpoints.getSubCategories + "?category_id=" + id;
        var result = await Axios.get(url);

        if (result.data.error === true) {
            console.log('there are some erros');

        } else {
            console.log(result.data.data);
            setSubCategories(result.data.data.categories);
        }
    }
    const setStateLocation = (e) => {
        setUserData({ ...userData, state: e.target.value });
        getCities(e.target.value);
    }

    const setCategory = (e) => {
        setUserData({ ...userData, 'category': e.target.value });
        getSubCategories(e.target.value);
    }
    const isValid = () => {
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(userData.email);
        if (userData.name === '' || userData.name === null || userData.name === undefined) {
            setUserDataError({ nameError: 'Please enter your name' });
            name.current.scrollIntoView();

        } else if (userData.email === '' || userData.email === null || userData.email === undefined || !emailValidator) {
            setUserDataError({ emailError: 'Please enter a valid email' });
            email.current.scrollIntoView();
        }
        else if (userData.mobile === '' || userData.mobile === null || userData.mobile === undefined || userData.mobile.length < 10) {
            setUserDataError({ mobileError: 'Please enter valid 10 digit mobile number!' });
            mobile.current.scrollIntoView();
        }
        else if (userData.category === '' || userData.category === null || userData.category === undefined || userData.category == 0) {
            setUserDataError({ categoryError: 'Please select a category' });
            category.current.scrollIntoView();
        }
        else if (userData.subcategory === '' || userData.subcategory === null || userData.subcategory === undefined || userData.subcategory == 0) {
            setUserDataError({ subCategoryError: 'Please select a subcategory' });
            subcategory.current.scrollIntoView();
        }
        else if (userData.min_price === '' || userData.min_price === null || userData.min_price === undefined) {
            setUserDataError({ minPriceError: 'Please enter Min Price' });
            min_price.current.scrollIntoView();
        }
        else if (userData.max_price === '' || userData.max_price === null || userData.max_price === undefined) {
            setUserDataError({ maxPriceError: 'Please enter max Price' });
            max_price.current.scrollIntoView();
        }
        else if (userData.state === '' || userData.state === null || userData.state === undefined) {
            setUserDataError({ stateError: 'Please select a state!' });
            state.current.scrollIntoView();
        }
        else if (userData.city === '' || userData.city === null || userData.city === undefined) {
            setUserDataError({ cityError: 'Please select a city!' });
            city.current.scrollIntoView();
        }
        else if (userData.tandc !== true) {
            setUserDataError({ tandcError: 'You must accept terms & condition to recived notifications!' });
        }
        else {
            return true;
        }
    }
    const handleSubmit = (e) => {
        setLoadingButton(true)
        e.preventDefault();

        if (isValid()) {
            var url = Host + Endpoints.addSubscriber;
            Axios.post(url, userData).then((response) => {
                setLoadingButton(false)

                if (response.data.error === true) {
                    errorToast(response.data.error);
                } else {
                    e.target.reset();
                    successToast(response.data.title);
                }
            }).catch((error) => {

                setLoadingButton(false);

            })
        } else {
            setLoadingButton(false);
        }
    }
    useEffect(() => {
        getStates();
        getCities();
        getSubCategories(1);
    }, []);
    return (
        <div className="col-lg-12">
            <div className="row m-5 d-flex justify-content-center">
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit}>
                    <div className="auth-text">
                        <h3>
                            Subscribe for <span style={{ color: "#004592" }}>Nep </span>
                            <span style={{ color: "#F42F2F" }}>Real Estate</span> alerts
                        </h3>
                        <p>
                            Get latest properties alerts based on your preferences.
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control form-control-light"
                            onChange={(e) => setUserData({ ...userData, 'name': e.target.value })}
                            placeholder="Username"
                            name="name"
                            ref={name}
                        />
                        <p style={errorStyle}>{userDataError.nameError}</p>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-light"
                                    onChange={(e) => setUserData({ ...userData, 'email': e.target.value })}
                                    placeholder="Email Address"
                                    name="email"
                                    ref={email}
                                />
                                <p style={errorStyle}>{userDataError.emailError}</p>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Mobile</label>
                                <input
                                    type="number"
                                    className="form-control form-control-light"
                                    onChange={(e) => setUserData({ ...userData, 'mobile': e.target.value })}
                                    placeholder="Please enter your mobile number"
                                    name="mobile"
                                    ref={mobile}
                                />
                                <p style={errorStyle}>{userDataError.mobileError}</p>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control form-control-light" onChange={(e) => setCategory(e)} ref={category}>
                                    {categories &&
                                        categories.map((value, index) => (
                                            <option value={index}>{value}</option>
                                        ))
                                    }
                                </select>
                                <p style={errorStyle}>{userDataError.categoryError}</p>

                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Sub Category</label>
                                <select className="form-control form-control-light" ref={subcategory} onChange={(e) => setUserData({ ...userData, 'subcategory': e.target.value })}>
                                    <option>Select sub category</option>
                                    {subCategories &&
                                        subCategories.map((value, index) => (
                                            <option value={value.id}>{value.name}</option>
                                        ))
                                    }

                                </select>
                                <p style={errorStyle}>{userDataError.subCategoryError}</p>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Min Price</label>
                                <input
                                    type="number"
                                    className="form-control form-control-light"
                                    onChange={(e) => setUserData({ ...userData, 'min_price': e.target.value })}
                                    placeholder="Enter Minimum price"
                                    name="min_price"
                                    ref={min_price}
                                />
                                <p style={errorStyle}>{userDataError.minPriceError}</p>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Max Price</label>
                                <input
                                    type="number"
                                    className="form-control form-control-light"
                                    onChange={(e) => setUserData({ ...userData, 'max_price': e.target.value })}
                                    placeholder="Enter Maximum price"
                                    name="max_price"
                                    ref={max_price}
                                />
                                <p style={errorStyle}>{userDataError.maxPriceError}</p>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>State</label>
                                <select className="form-control form-control-light" ref={state} onChange={(e) => setStateLocation(e)}>
                                    <option>Select State</option>
                                    {states &&
                                        states.map((value, index) => (
                                            <option value={value.id}>{value.state_name}</option>

                                        ))
                                    }
                                </select>
                                <p style={errorStyle}>{userDataError.stateError}</p>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>City</label>
                                <select className="form-control form-control-light" ref={city} onChange={(e) => setUserData({ ...userData, 'city': e.target.value })}>
                                    <option>Select city</option>
                                    {cities &&
                                        cities.map((value, index) => (
                                            <option value={value.id}>{value.city_name}</option>

                                        ))
                                    }
                                </select>
                                <p style={errorStyle}>{userDataError.cityError}</p>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="termsAndConditions"
                                onChange={(e) => setUserData({ ...userData, 'tandc': e.target.checked })}
                                name="tandcBox"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="termsAndConditions"
                            >
                                I Agree to the{" "}
                                <Link to="/terms-and-conditions"> terms &amp; Conditions </Link>{" "}
                                of Property Submission
                            </label>

                            <p style={errorStyle}>{userDataError.tandcError}</p>

                        </div>

                    </div>
                    <button type="submit" className="btn-custom secondary btn-block" disabled={loadingButton}>
                        Get Notified!
                        {loadingButton === true ?
                            <div className="ml-1 spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : ''
                        }
                    </button>
                </form>
            </div >
        </div >

    );
};

export default Content;
