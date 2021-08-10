import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import Calculator from "../../layouts/Calculator";
import $ from "jquery";
import "magnific-popup";
import classNames from "classnames";
import Slider from "react-slick";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    openInGmail,
    saveProperty,
    Endpoints,
    Host,
    convertToSlug,
    getUserToken,
    uppercaseFirstLetter,
    successToast,
    errorToast
} from "../../../helper/comman_helper";
import Loader from "../../layouts/Loader";
import ContentNotFound from "../../pages/ContentNotFound";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;
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
// const settings = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     dots: false,
// };
const settings = {


    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    // fade: true,
    // focusOnSelect: true,
    // centerPadding: '10px',
    // autoplay: true,
    autoplaySpeed: 2000,
    // infinite: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

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

const Listingwrapper = ({ propertyDetails }) => {
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
    const slider = useRef();

    const [recentProperties, setRecentProperties] = useState([]);

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);


    const imageGal = {

        height: "485px",
    };
    function popup() {
        $(".gallery-thumb").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });
    }


    const getRecentProperties = () => {
        var url = Host + Endpoints.getRecentProperties;
        Axios.get(url).then((response) => {
            if (response.data.error === true) {
                alert(response.data.title);
            } else {
                setRecentProperties(response.data.data);
            }
        });
    };
    useEffect(() => {
        window.scrollTo(0, 0);

        getRecentProperties();
        setNav1(slider1);
        setNav2(slider2);
    }, [propertyID]);

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
        e.preventDefault();

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

    return (
        <div className="section listing-wrapper " ref={ref}>
            {propertyDetails == null || propertyDetails == undefined ? (<Loader />) : (
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
                                                to="#"
                                                className="slider-thumbnail-item gallery-thumb"
                                            >
                                                <img className="rounded"
                                                    style={{ imageGal }}
                                                    src={
                                                        process.env.REACT_APP_CONTENT_URL + item + ".jpg"
                                                    }
                                                    alt={
                                                        propertyDetails && propertyDetails.title
                                                            ? propertyDetails.title
                                                            : ""
                                                    }
                                                    style={{ width: "100%", height: "548px" }}
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
                                                        process.env.REACT_APP_CONTENT_URL + item + ".jpg"
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
                                        ) <span className="text-muted" style={{ fontSize: "18px" }}>{propertyDetails.price_on}</span>
                                    </h4>
                                    {propertyDetails && propertyDetails.description
                                        ? propertyDetails.description
                                        : ""}
                                    <br />
                                    <br />
                                    <b>Address: </b>{" "}
                                    {propertyDetails && propertyDetails.address
                                        ? propertyDetails.address + ", "
                                        : ""}
                                    <b>
                                        {propertyDetails && propertyDetails.city_name
                                            ? propertyDetails.city_name + ", "
                                            : ""},
                                    </b>

                                    <b>
                                        {propertyDetails && propertyDetails.state_name
                                            ? propertyDetails.state_name + ", "
                                            : ""}
                                    </b>
                                </div>
                                <div className="section section-padding  acr-listing-features">
                                    <h4>Property Details</h4>
                                    <div className="row">
                                        {propertyDetails && propertyDetails.category_name ? (
                                            <div className="listing-feature col-lg-6 col-md-6">
                                                <img className="propertyDetailsOtherDetails" src={process.env.REACT_APP_CONTENT_URL + '/features/38.jpg'} />

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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
                                                <h6 className="listing-feature-label">Build Year</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.build_year}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="listing-feature col-lg-6 col-md-6">
                                            <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
                                            <h6 className="listing-feature-label">Pets Considere</h6>
                                            <span className="listing-feature-value">
                                                {propertyDetails && propertyDetails.pets_considere
                                                    ? "YES"
                                                    : "NO"}
                                            </span>
                                        </div>

                                        <div className="listing-feature col-lg-6 col-md-6">
                                            <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
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
                                                <span className="fa fa-star fa-lg propertyDetailsOtherDetails" aria-hidden="true"></span>
                                                <h6 className="listing-feature-label">Property Type</h6>
                                                <span className="listing-feature-value">
                                                    {propertyDetails.property_type}
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
                                                    <h5 className="col-12 text-left">Outdoon Features:</h5>
                                                    {
                                                        propertyDetails.features.outdoor ? propertyDetails.features.outdoor.map((value, index) => {
                                                            {
                                                                return <div key={index} className="listing-feature">
                                                                    <i className={`flaticon-${value.icon}`} />

                                                                    <h6 className="listing-feature-label">
                                                                        {value.feature}
                                                                    </h6>
                                                                    <span className="listing-feature-value">

                                                                    </span>
                                                                </div>
                                                            }
                                                        }) : ("No Outdoon Features Mentioned")
                                                    }

                                                    <h5 className="col-12 text-left mt-3">Indoor Features:</h5>
                                                    {
                                                        propertyDetails.features.indoor ? propertyDetails.features.indoor.map((value, index) => {
                                                            {
                                                                return <div key={index} className="listing-feature">
                                                                    <i className={`flaticon-${value.icon}`} />

                                                                    <h6 className="listing-feature-label">
                                                                        {value.feature}
                                                                    </h6>
                                                                    <span className="listing-feature-value">

                                                                    </span>
                                                                </div>
                                                            }
                                                        }) : ("No Indoor Features Mentioned")
                                                    }

                                                    <h5 className="col-12 text-left mt-3">Climate Control & Energy Features:</h5>
                                                    {
                                                        propertyDetails.features.climate ? propertyDetails.features.climate.map((value, index) => (
                                                            <div key={index} className="listing-feature">
                                                                <i className={`flaticon-${value.icon}`} />

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
                                        {/* {propertyDetails &&
                                            propertyDetails.features ? propertyDetails.features.map((value, index) => {
                                                {

                                                    return <div key={index} className="listing-feature">
                                                        <i className={`flaticon-${value.icon}`} />

                                                        <h6 className="listing-feature-label">
                                                            {value.feature}
                                                        </h6>
                                                        <span className="listing-feature-value">

                                                        </span>
                                                    </div>

                                                }

                                            }) : ('There are no features selected')
                                        } */}


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

                                {/* Pagination Start
                                        <div className="section p-0 post-single-pagination-wrapper">
                                            <div className="post-single-pagination post-prev">
                                                <i className="fas fa-arrow-left" />
                                                <Link to="#" className="post-single-pagination-content">
                                                    <span>Prev Listing</span>
                                                    <h6>Theodore Lowe, Azusa New York 39531</h6>
                                                </Link>
                                            </div>
                                            <div className="post-single-pagination post-next">
                                                <Link to="#" className="post-single-pagination-content">
                                                    <span>Next Listing</span>
                                                    <h6>Cecilia Chapman, Mankato Mississippi 96522</h6>
                                                </Link>
                                                <i className="fas fa-arrow-right" />
                                            </div>
                                        </div>
                                        */}
                                {/* Similar Start */}

                                <div className="section section-padding">
                                    <h4>Recent Listings</h4>
                                    <div className="row">
                                        {/* Listing Start */}
                                        {recentProperties &&
                                            recentProperties.slice(0, 4).map((item, i) => (
                                                <div key={i} className="col-lg-6">
                                                    <div className="listing">
                                                        <div className="listing-thumbnail " >
                                                            <Link to={`/property/${convertToSlug(item.title)}/${item.id}`}>
                                                                <img src={item.image != null ? process.env.REACT_APP_CONTENT_URL + item.image + "_medium.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                                                                    alt={`image of ${item.title}`}
                                                                    style={{ width: "300px", height: "200px" }}
                                                                />
                                                            </Link>

                                                            <div className="listing-badges">
                                                                {item.star === true ? (
                                                                    <span className="listing-badge featured">
                                                                        {" "}
                                                                        <i className="fas fa-star" />{" "}
                                                                    </span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {item.property_type === "buy" ? (
                                                                    <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {item.property_type === "sold" ? (
                                                                    <span className="listing-badge pending">{uppercaseFirstLetter(item.property_type)}</span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {item.property_type === "rent" ? (
                                                                    <span className="listing-badge rent">{uppercaseFirstLetter(item.property_type)}</span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {item.property_type === "share" ? (
                                                                    <span className="listing-badge rent">{uppercaseFirstLetter(item.property_type)}</span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {item.property_type === "invest" ? (
                                                                    <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {item.property_type === "lease" ? (
                                                                    <span className="listing-badge sale">{uppercaseFirstLetter(item.property_type)}</span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            {/*
                                                    <div className="listing-controls">
                                                      <Link to="#" onClick={() => saveProperty(item.id)} className="favorite">
                                                        <i className="far fa-heart" />
                                                      </Link>
                                                    </div>
                                                    */}
                                                        </div>
                                                        <div className="listing-body">
                                                            <div className="listing-author">
                                                                <img src={item.profile_image != null ? process.env.REACT_APP_CONTENT_URL + item.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                                                                    alt={item.profile_image + "_small.jpg"}
                                                                />
                                                                <div className="listing-author-body">
                                                                    <p>
                                                                        {" "}
                                                                        <Link to="#">{item.name}</Link>{" "}
                                                                    </p>
                                                                    <span className="listing-date">{new Date(item.createdAt).toDateString()}</span>
                                                                </div>
                                                                <Dropdown className="options-dropdown">
                                                                    <Dropdown.Toggle as={NavLink}>
                                                                        <i className="fas fa-ellipsis-v" />
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="dropdown-menu-right">
                                                                        <ul>
                                                                            <li>
                                                                                {" "}
                                                                                <Link target="_blank" to={{ pathname: `tel:${item.number_for_contact}` }}>
                                                                                    {" "}
                                                                                    <i className="fas fa-phone" /> Call Agent
                                                                                </Link>{" "}
                                                                            </li>
                                                                            <li>
                                                                                {" "}
                                                                                <Link target="_blank" to={{ pathname: `${openInGmail(item.email_for_contact)}` }}>
                                                                                    {" "}
                                                                                    <i className="fas fa-envelope" /> Send Message
                                                                                </Link>{" "}
                                                                            </li>
                                                                            <li>
                                                                                {" "}
                                                                                <Link to={`/property/${convertToSlug(item.title)}/${item.id}#book_tour`}>
                                                                                    {" "}
                                                                                    <i className="fas fa-bookmark" /> Book Tour
                                                                                </Link>{" "}
                                                                            </li>
                                                                        </ul>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                            <h5 className="listing-title">
                                                                {" "}
                                                                <Link to={`/property/${convertToSlug(item.title)}/${item.id}`} title={item.title}>
                                                                    {item.title}
                                                                </Link>{" "}
                                                            </h5>
                                                            <span className="listing-price">
                                                                Rs. {new Number(item.price).toLocaleString()}
                                                                <span> {item.price_on}</span>{" "}
                                                            </span>
                                                            <p className="listing-text">{item.text}</p>
                                                            <div className="acr-listing-icons">
                                                                <OverlayTrigger overlay={bedstip}>
                                                                    <div className="acr-listing-icon">
                                                                        <i className="flaticon-bedroom" />
                                                                        <span className="acr-listing-icon-value">
                                                                            {item.no_of_beds}
                                                                        </span>
                                                                    </div>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={bathstip}>
                                                                    <div className="acr-listing-icon">
                                                                        <i className="flaticon-bathroom" />
                                                                        <span className="acr-listing-icon-value">
                                                                            {item.no_of_bathrooms}
                                                                        </span>
                                                                    </div>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={<Tooltip>Sqft</Tooltip>}>
                                                                    <div className="acr-listing-icon">
                                                                        <i className="flaticon-ruler" />
                                                                        <span className="acr-listing-icon-value">
                                                                            {item.area_in_sqft}
                                                                        </span>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            </div>
                                                            <div className="listing-gallery-wrapper">
                                                                <Link
                                                                    to={`/property/${convertToSlug(item.title)}/${item.id}`}
                                                                    className="btn-custom btn-sm secondary"
                                                                >
                                                                    View Details
                                                                </Link>
                                                                <OverlayTrigger overlay={gallerytip}>
                                                                    <Link to={`/property/${convertToSlug(item.title)}/${item.id}`} className="listing-gallery">
                                                                        {" "}
                                                                        <i className="fas fa-camera" />{" "}
                                                                    </Link>
                                                                </OverlayTrigger>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        {/* Listing End */}
                                    </div>
                                </div>
                                {/* Similar End */}
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
                                                    propertyDetails && propertyDetails.is_contact_show === 1 ? propertyDetails.profile_image != null ? process.env.REACT_APP_CONTENT_URL + propertyDetails.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png" : process.env.REACT_APP_CONTENT_URL + "/neprealestate-logo/logo.png"
                                                }
                                                alt={propertyDetails.profile_image + "_small.jpg"}
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
                                                    type="email"
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
                                                    type="text"
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
                                            >
                                                Send Message
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

export default Listingwrapper;
