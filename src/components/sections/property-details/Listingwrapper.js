import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";

import $ from "jquery";
import "magnific-popup";

import Slider from "react-slick";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    openInGmail,
    Endpoints,
    Host,
    getUserToken,
    uppercaseFirstLetter,
    successToast,
    errorToast
} from "../../../helper/comman_helper";
import ContentNotFound from "../../pages/ContentNotFound";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


import Recentlistings from './../homefour/Recentlistings';

const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#c1c4c1" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#c1c4c1" }}
            onClick={onClick}
        />
    );
}
const listingThumbnail = {
    borderRadius: "0px"
}
const listing = {
    padding: "0px"
}
const listingBody = {
    margin: "10px",
    padding: "7px"
}
const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

};

const settingsthumb = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    autoplay: true,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

const Listingwrapper = ({ propertyDetails, coordinates, recentProperties }) => {
    var propertyType = propertyDetails && propertyDetails.property_type;
    const [loadingButton, setLoadingButton] = useState(false);

    const errorStyle = {
        color: "red",
        fontSize: "14px",
    };
    const successStyle = {
        color: "#28a745",
        fontSize: "14px",
    };
    const ref = useRef();
    const { propertyID } = useParams();

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    const [isGallaryReady, setIsGallaryReady] = useState(false);

    const imageGal = {

        height: "485px",
    };
    function popup() {
        if (propertyDetails !== null && window.location.pathname.split("/")[1] === 'property') {
            setTimeout(function () {
                $(".gallery-thumb").magnificPopup({
                    type: "image",
                    gallery: {
                        enabled: true,
                        delegate: '.gallery-thumb:not(.slick-cloned) a',
                    },
                });
                setIsGallaryReady(true);
            }, 3000)
        }
    }

    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [comment, setComment] = useState("");

    const [fnameError, setFnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [dateError, setDateError] = useState("");
    const [commentError, setCommentError] = useState("");

    const [contactUsStatus, setContactUsStatus] = useState("");


    const isValid = () => {
        var emailValidator = new RegExp(
            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
        ).test(email);

        if (
            fname === "" &&
            phone === "" &&
            // date === "" &&
            comment === "" &&
            !emailValidator
        ) {
            setFnameError("Name feild should not be empty!");
            setEmailError("Please enter a valid email address!");
            setPhoneError("Please enter valid 10 digit mobile number!");
            // setDateError("Date feild in required!");
            setCommentError("Mobile Number feild should not be empty!");
        }
        else if (fname === "") {
            setFnameError("Name feild should not be empty!");
        }
        else if (!emailValidator) {
            setEmailError("Please enter a valid email address!");
        } else if (phone === "" || phone.length < 10) {
            setPhoneError("Please enter valid 10 digit mobile number!");
        }
        // else if (date === "") {
        //     setDateError("Date feild in required!");
        // }
        else if (comment === "") {
            setCommentError("Mobile Number feild should not be empty!");
        } else {
            return true;
        }
    };

    const submitFun = (e) => {
        setLoadingButton(true);
        e.preventDefault();
        console.log(loadingButton)
        setFnameError("");
        setEmailError("");
        setPhoneError("");
        // setDateError("");
        setCommentError("");

        if (isValid()) {
            var url = Host + Endpoints.propertyEnquiry;
            var userData = {
                email,
                mobile: phone,
                message: comment,
                property_id: propertyID,
                fullname: fname,
                enquiry_date: '2020-05-12'
            }

            Axios.post(url, userData).then((response) => {
                setLoadingButton(false);
                if (response.data.error === true) {
                    errorToast(response.data.error);
                } else {
                    e.target.reset();
                    setContactUsStatus({ 'success': true, 'message': 'Our team will get back to you Asap!' });
                    successToast("Thank you! Our team will get back to you!");
                }
            });


        } else {
            console.log("In else");
            setLoadingButton(false);
        }

    };

    const agentProfileImage =
        propertyDetails && propertyDetails.profile_image
            ? propertyDetails.profile_image + "_small.jpg"
            : "";
    var mainslider = [];
    if (propertyDetails && propertyDetails.images !== null) {
        var array = JSON.parse("[" + propertyDetails.images + "]");
        for (var i = 0; i < array[0].length; i++) {
            mainslider.push(array[0][i]);
        }
    }

    if (coordinates.lat !== null && coordinates.lang !== null) {

        var latlng = new window.google.maps.LatLng(coordinates.lat, coordinates.lang); //Set the default location of map
        var map = new window.google.maps.Map(document.getElementById("map"), {
            center: latlng,
            zoom: 15, //The zoom value for map
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

        var marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
            title: "Place the marker for your location!", //The title on hover to display
            draggable: true, //this makes it drag and drop
        });

        // window.google.maps.event.addListener(marker, "dragend", function (a) {
        //     console.log("RAHUL : " + a);
        // });
    } else {
        console.log('Inside else Statement!');
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setNav1(slider1);
        setNav2(slider2);
        popup();

    }, [propertyID]);
    return (
        <div className="section listing-wrapper " ref={ref}>
            {propertyDetails === false ? <ContentNotFound /> : (
                <>
                    <div className="container">
                        <div className="row">
                            {/* Listings Start */}
                            <div className="col-lg-8">
                                <h4>
                                    {propertyDetails && propertyDetails.title
                                        ? propertyDetails.title
                                        : ""}{" "}
                                </h4>

                                <Slider
                                    className="listing-thumbnail-slider-main col-12"
                                    asNavFor={nav2}
                                    ref={slider => (setSlider1(slider))}
                                    {...settings}

                                >
                                    {mainslider &&
                                        mainslider.map((item, i) => (
                                            <Link
                                                key={i}
                                                to={isGallaryReady ? { pathname: Host + item + ".jpg" } : '#'}
                                                className="slider-thumbnail-item gallery-thumb"
                                            >
                                                <img className="rounded"
                                                    style={{ imageGal }}
                                                    src={
                                                        Host + item + ".jpg"
                                                    }
                                                    alt={
                                                        propertyDetails && propertyDetails.title
                                                            ? propertyDetails.title
                                                            : ""
                                                    }
                                                    style={{ width: "100%", maxHeight: "548px" }}
                                                />
                                            </Link>
                                        ))}
                                </Slider>
                                <div className="thumbnail-slider-wrap">
                                    {/* Slider2 Starts */}
                                    <Slider
                                        asNavFor={nav1}
                                        ref={slider => (setSlider2(slider))}
                                        {...settingsthumb}
                                    >
                                        {mainslider.map((item, i) =>
                                            <div className="slick-slide" key={i}>
                                                <img className="rounded"
                                                    style={{ imageGal }}
                                                    src={
                                                        Host + item + ".jpg"
                                                    }
                                                    alt={
                                                        propertyDetails && propertyDetails.title
                                                            ? propertyDetails.title
                                                            : ""
                                                    }
                                                    style={{ width: "100%", height: "100px", objectFit: "cover", cursor: "pointer", padding: "5px" }}
                                                />
                                            </div>
                                        )}
                                    </Slider>
                                    {/* Slider2 Ends */}
                                </div>

                                {/* Content Start */}
                                <div className="listing-content">
                                    <h4 className="mt-5">
                                        Property Overview (Rs.{" "}
                                        {propertyDetails && propertyDetails.price
                                            ? new Number(propertyDetails.price).toLocaleString()
                                            : ""}
                                        ) <span className="text-muted" style={{ fontSize: "18px" }}>{propertyDetails && propertyDetails.price_on}</span>
                                    </h4>

                                    {ReactHtmlParser(propertyDetails && propertyDetails.description
                                        ? propertyDetails.description
                                        : "")}
                                    <br />
                                    <br />
                                    <b>Address: </b>{" "}
                                    {propertyDetails && propertyDetails.address
                                        ? propertyDetails.address
                                        : ""}

                                </div>
                                <div className="mt-2 listing-content">

                                    <div id="map"></div>

                                </div>
                                <div className="section section-padding  acr-listing-features">
                                    <h4>Property Details</h4>
                                    <div className="row">
                                        {getUserToken() !== null && getUserToken().data !== undefined ? (
                                            propertyDetails !== null && getUserToken().data.id == propertyDetails.user_id ? (
                                                <div className="listing-feature col-lg-6 col-md-6">
                                                    <i className="flaticon-sales-agent"></i>
                                                    <h6 className="listing-feature-label">
                                                        Admin Charges</h6>
                                                    <span className="listing-feature-value">
                                                        {propertyDetails && propertyDetails.admin_cost ? "Rs." + new Number(propertyDetails.admin_cost).toLocaleString() : 'Not specified yet'}
                                                    </span>
                                                </div>
                                            ) : ("")

                                        ) : ("")
                                        }


                                        {propertyDetails && propertyDetails.category_name ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-checklist"></i>

                                                <h6 className="listing-feature-label">

                                                    Category</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails && propertyDetails.category_name ? propertyDetails.category_name : ''}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {propertyDetails && propertyDetails.sub_category_name ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-list"></i>

                                                <h6 className="listing-feature-label">Sub category</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails && propertyDetails.sub_category_name
                                                        ? propertyDetails.sub_category_name
                                                        : ""}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {propertyDetails && propertyDetails.area ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-ruler"></i>
                                                <h6 className="listing-feature-label">Total Area</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails && propertyDetails.area
                                                        ? propertyDetails.area +
                                                        " " +
                                                        propertyDetails.default_area_unit
                                                        : ""}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {propertyDetails && propertyDetails.carpet_area ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-ruler"></i>
                                                <h6 className="listing-feature-label">Build Up Area</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.carpet_area +
                                                        " " +
                                                        propertyDetails.default_area_unit}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {/* {propertyDetails && propertyDetails.area_in_sqft ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                            <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></i>  span 
                                            <h6 className="listing-feature-label">Area in Sqft.</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.area_in_sqft + " Sqft"}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        {/* {propertyDetails && propertyDetails.area_type ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                            <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></i>  span 
                                            <h6 className="listing-feature-label">Area Type</h6>
                                                <span className="listing-feature-value">
                                                    {uppercaseFirstLetter(propertyDetails.area_type)}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                        {propertyDetails && propertyDetails.build_type ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-new"></i>
                                                <h6 className="listing-feature-label">Build Type</h6>
                                                <span className="listing-feature-value">
                                                    {uppercaseFirstLetter(propertyDetails.build_type)}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {propertyDetails && propertyDetails.no_of_bathrooms ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-bathroom"></i>
                                                <h6 className="listing-feature-label">
                                                    No of bathrooms
                                                </h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.no_of_bathrooms} Bathrooms
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {propertyDetails && propertyDetails.no_of_beds ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-bedroom"></i>
                                                <h6 className="listing-feature-label">No of Beds</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.no_of_beds + " Beds"}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}


                                        {propertyDetails && propertyDetails.no_of_garage ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-garage"></i>
                                                <h6 className="listing-feature-label">No of Garage</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.no_of_garage + " Garages"}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {propertyDetails && propertyDetails.no_of_rooms ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-company"></i>
                                                <h6 className="listing-feature-label">No of Rooms</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.no_of_rooms + " Rooms"}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {propertyDetails && propertyDetails.road_type ? (
                                            <div className="listing-feature col-lg-6 col-md-6">

                                                <i className="flaticon-towels"></i>
                                                <h6 className="listing-feature-label">Road Type</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.road_type}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {propertyDetails && propertyDetails.car_spaces ? (
                                            <div className="listing-feature col-lg-6 col-md-6">

                                                <i className="flaticon-garage"></i>
                                                <h6 className="listing-feature-label">Car spaces</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.car_spaces + " Car spaces"}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {propertyDetails && propertyDetails.facing ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-eye"></i>
                                                <h6 className="listing-feature-label">Facing</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.facing}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {propertyDetails && propertyDetails.floor ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-stairs"></i>

                                                <h6 className="listing-feature-label">Floor</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.floor} Floors
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {propertyDetails && propertyDetails.furnishing ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-chair"></i>
                                                <h6 className="listing-feature-label">Furnishing</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.furnishing}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {/* {propertyDetails && propertyDetails.are_you ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                            <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></i>  span 
                                            <h6 className="listing-feature-label">Posted By</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.are_you}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )} */}

                                        {propertyDetails && propertyDetails.available_from ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-event"></i>

                                                <h6 className="listing-feature-label">
                                                    Available From
                                                </h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.available_from}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {propertyDetails && propertyDetails.build_year ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-history"></i>
                                                <h6 className="listing-feature-label">Build Year</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.build_year}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="listing-feature col-lg-6 col-md-6">
                                            <i className="flaticon-bone"></i>
                                            <h6 className="listing-feature-label">Pets Considere</h6>
                                            <span className="listing-feature-value">
                                                {propertyDetails && propertyDetails.pets_considere
                                                    ? "YES"
                                                    : "NO"}
                                            </span>
                                        </div>

                                        <div className="listing-feature col-lg-6 col-md-6">
                                            <i className="flaticon-sales-agent"></i>
                                            <h6 className="listing-feature-label">
                                                Price Negotiable
                                            </h6>
                                            <span className="listing-feature-value">
                                                {propertyDetails &&
                                                    propertyDetails.price_negotiable === 1
                                                    ? "YES"
                                                    : "NO"}
                                            </span>
                                        </div>
                                        {propertyDetails && propertyDetails.property_type ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <i className="flaticon-home"></i>
                                                <h6 className="listing-feature-label">Property Type</h6>
                                                <span className="listing-feature-value">
                                                    {uppercaseFirstLetter(propertyDetails.property_type)}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>{" "}
                                    {/*Row Ends*/}
                                </div>

                                <div className="section section-padding  acr-listing-features">
                                    <h4>Features</h4>
                                    <div className="row">

                                        {propertyDetails && propertyDetails.features ?
                                            (
                                                <div className="row">
                                                    {
                                                        propertyDetails.features.outdoor.length > 0 && <h5 className="col-12 text-left">Outdoon Features:</h5>
                                                    }
                                                    {
                                                        propertyDetails.features.outdoor ? propertyDetails.features.outdoor.map((value, index) => (

                                                            <div key={index} className="listing-feature">
                                                                <img className="propertyDetailsOtherDetails" src={Host + value.icon + ".jpg"} />
                                                                <h6 className="listing-feature-label">
                                                                    {value.feature}
                                                                </h6>
                                                                <span className="listing-feature-value">

                                                                </span>
                                                            </div>
                                                        )) : ("No Outdoon Features Mentioned")
                                                    }

                                                    {
                                                        propertyDetails.features.indoor.length > 0 && <h5 className="col-12 text-left">Indoor Features:</h5>
                                                    }
                                                    {
                                                        propertyDetails.features.indoor ? propertyDetails.features.indoor.map((value, index) => {
                                                            {
                                                                return <div key={index} className="listing-feature">
                                                                    <img className="propertyDetailsOtherDetails" src={Host + value.icon + ".jpg"} />

                                                                    <h6 className="listing-feature-label">
                                                                        {value.feature}
                                                                    </h6>
                                                                    <span className="listing-feature-value">

                                                                    </span>
                                                                </div>
                                                            }
                                                        }) : ("No Indoor Features Mentioned")
                                                    }
                                                    {
                                                        propertyDetails.features.climate.length > 0 && <h5 className="col-12 text-left mt-3">Climate Control & Energy Features:</h5>
                                                    }
                                                    {
                                                        propertyDetails.features.climate ? propertyDetails.features.climate.map((value, index) => (
                                                            <div key={index} className="listing-feature">
                                                                <img className="propertyDetailsOtherDetails" src={Host + value.icon + ".jpg"} />

                                                                <h6 className="listing-feature-label">
                                                                    {value.feature}
                                                                </h6>
                                                                <span className="listing-feature-value">

                                                                </span>
                                                            </div>
                                                        )) : ("No Climate Control Features Mentioned")
                                                    }
                                                </div>
                                            )
                                            : ('There are no features selected')
                                        }
                                    </div>
                                </div>
                                {propertyDetails && propertyDetails.video_url ? (
                                    <div className="section pt-0">
                                        <h4>Property Video</h4>
                                        <div className="embed-responsive embed-responsive-21by9">
                                            <iframe
                                                width="560"
                                                height="515"
                                                src={`https://www.youtube.com/embed/${propertyDetails.video_url}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <Recentlistings recentProperties={recentProperties} col={6} />
                            </div>
                            {/* Listings End */}
                            {/* Sidebar Start */}
                            <div className="col-lg-4">
                                <div style={{ top: 20 }} className="sidebar sticky-sidebar sidebar-left agent-wrapper">
                                    <div className="sidebar-widget sidebar-widget-agent">
                                        {/* Author Start */}
                                        <div className="media sidebar-author listing-agent">
                                            <img
                                                src={
                                                    propertyDetails && propertyDetails.is_contact_show === 1 ? propertyDetails && propertyDetails.profile_image != null ? Host + propertyDetails.profile_image + "_small.jpg" : Host + "/users/default.png" : Host + "/neprealestate-logo/logo.png"
                                                }
                                                alt={propertyDetails && propertyDetails.profile_image + "_small.jpg"}
                                            />
                                            <div className="media-body">
                                                <h6>
                                                    {" "}
                                                    {propertyDetails && propertyDetails.name_for_contact
                                                        ? uppercaseFirstLetter(
                                                            propertyDetails.name_for_contact
                                                        )
                                                        : ""}{" "}
                                                </h6>
                                                <span>
                                                    {
                                                        propertyDetails && propertyDetails.is_contact_show === 1 ? propertyDetails.are_you ? uppercaseFirstLetter(propertyDetails.are_you) : '' : 'Customer care Team'
                                                    }
                                                </span>
                                            </div>
                                            <Dropdown className="options-dropdown">
                                                <Dropdown.Toggle as={NavLink}>
                                                    <i className="fas fa-ellipsis-v" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu-right">
                                                    <ul>
                                                        {propertyDetails &&
                                                            propertyDetails.name_for_contact ? (
                                                            <li>
                                                                <Link
                                                                    target="_blank"
                                                                    to={{
                                                                        pathname: `tel:${propertyDetails.number_for_contact}`,
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    <i className="fas fa-phone" /> Call{" "}
                                                                    {uppercaseFirstLetter(
                                                                        propertyDetails.name_for_contact
                                                                    )}
                                                                </Link>
                                                            </li>
                                                        ) : (
                                                            ""
                                                        )}

                                                        {propertyDetails &&
                                                            propertyDetails.email_for_contact ? (
                                                            <li>
                                                                <Link
                                                                    target="_blank"
                                                                    to={{
                                                                        pathname: `${openInGmail(
                                                                            propertyDetails.email_for_contact,
                                                                            propertyDetails.title,
                                                                            window.location.href
                                                                        )}`,
                                                                    }}
                                                                >
                                                                    <i className="fas fa-envelope" /> Send Message
                                                                </Link>
                                                            </li>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </ul>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        {/* Author End */}
                                        <div className="media-body"><h6> Request a Call back </h6></div>
                                        <form onSubmit={submitFun}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    name="fname"
                                                    onChange={(e) => setFname(e.target.value)}
                                                />
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {fnameError}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    name="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {emailError}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Phone Number"
                                                    name="phone"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {phoneError}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Type your comment..."
                                                    name="comment"
                                                    onChange={(e) => setComment(e.target.value)}
                                                    rows={2}
                                                />
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {commentError}
                                                </p>

                                                {
                                                    contactUsStatus.success === true ?
                                                        <p className="text-center" style={successStyle}>
                                                            {contactUsStatus.message}
                                                        </p>
                                                        :
                                                        <p className="text-center" style={errorStyle}>
                                                            {contactUsStatus.message}
                                                        </p>
                                                }
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn-custom primary light btn-block"
                                                disabled={loadingButton}
                                            >
                                                Send Message
                                                {loadingButton === true ?
                                                    <div className="ml-1 spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : ''
                                                }
                                            </button>
                                            <ToastContainer />
                                        </form>
                                        {/* Contact End */}
                                    </div>
                                </div>
                            </div>
                            {/* Sidebar End */}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default Listingwrapper
