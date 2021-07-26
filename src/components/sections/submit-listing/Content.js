import React, { useEffect, useState, useRef } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Locationtab from './Locationtab';
import { ToastContainer } from "react-toastify";

import {
    floorlist, userTypeDrop, buildType, roadType,
    bedslist,
    category,
    subCategories,

    bathroomslist,
    type, facing, carspaces, areaUnit
} from "../../../data/select.json";
import { Host, Endpoints, successToast, errorToast, errorStyle } from '../../../helper/comman_helper';
import Axios from 'axios';
// Features
const features = [
    { id: 1, icon: 'bone', title: 'Pet Friendly' },
    { id: 2, icon: 'chair', title: 'Furnished' },
    { id: 3, icon: 'fan', title: 'Cooling' },
    { id: 4, icon: 'garage', title: 'Parking' },
    { id: 5, icon: 'mailbox', title: 'Mailbox' },
    { id: 6, icon: 'eye', title: 'City View' },
];

function Content(props) {
    const errorStyle = {
        color: 'red',
        fontSize: '14px',
    };
    const successStyle = {
        color: '#28a745',
        fontSize: '14px',
    };
    const userInfo = JSON.parse(localStorage.getItem("token")); // get this details from db
    const userID = userInfo.data.id;

    const [propertyData, setPropertyData] = useState([]);
    const [propertyDataError, setPropertyDataError] = useState([]);

    const [states, setStates] = useState([]);

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setPropertyData(...propertyData,
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )

        }
    });
    const [isImageSelected, setIsImageSelected] = useState([]);

    const getStates = () => {
        var url = Host + Endpoints.getStates;
        Axios.get(url).then((response) => {
            setStates(response.data.data);
        });
    };
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        setIsImageSelected({ ...isImageSelected, 'image': `${file.name} has been selected` });
        const base64Image = await convertToBase64(file);
        setPropertyData({ ...propertyData, "image": base64Image });
    }
    const uploadMultipleImages = async (e) => {
        var images = e.target.files;

        var base64Images = [];
        for (var i = 0; i < images.length; i++) {
            const multipleImages = await convertToBase64(images[i]);
            base64Images.push(multipleImages);
        }
        setIsImageSelected({ ...isImageSelected, 'images': `${images.length} images has been selected!` })
        setPropertyData({ ...propertyData, "images": base64Images });
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    alt="img"
                />
            </div>
        </div>
    ));
    const [stepID, setStepID] = useState(1);


    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        getStates();

        setPropertyData({
            ...propertyData, "city": "Mumbai", "user_id": userID, "features": [1, 2]
        });

        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);



    const title = useRef();
    const price = useRef();
    const image = useRef();
    const images = useRef();
    const address = useRef();
    const city = useRef();
    const state = useRef();
    const area = useRef();
    const default_area_unit = useRef();
    const property_type = useRef();
    const categoryRef = useRef();
    const subcategory = useRef();
    const description = useRef();
    const are_you = useRef();
    const name_for_contact = useRef();
    const number_for_contact = useRef();
    const email_for_contact = useRef();

    const isValid = () => {
        var emailValidator = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(propertyData.email_for_contact);

        if (propertyData.title === '' || propertyData.title === null || propertyData.title === undefined) {
            errorToast("title is required feild");
            document.getElementById("tab1").click();
            title.current.scrollIntoView();
            setPropertyDataError({ title: "title is required feild" });
            return false;
        }
        else if (propertyData.description === '' || propertyData.description === null || propertyData.description === undefined) {
            errorToast("description is required feild");
            document.getElementById("tab1").click();
            are_you.current.scrollIntoView();
            setPropertyDataError({ description: "Please add description!" });
            return false;
        }
        else if (propertyData.property_type === '' || propertyData.property_type === null || propertyData.property_type === undefined) {
            errorToast("property_type is required feild");
            document.getElementById("tab1").click();
            property_type.current.scrollIntoView();
            setPropertyDataError({ property_type: "Please select property type!" });
            return false;
        }
        else if (propertyData.price === '' || propertyData.price === null || propertyData.price === undefined) {
            errorToast("price is required feild");
            document.getElementById("tab1").click();
            price.current.scrollIntoView();
            setPropertyDataError({ price: "Please add price!" });
            return false;
        }

        else if (propertyData.category === '' || propertyData.category === null || propertyData.category === undefined) {
            errorToast("category is required feild");
            document.getElementById("tab1").click();
            categoryRef.current.scrollIntoView();
            setPropertyDataError({ category: "Please specify property category!" });
            return false;
        }
        else if (propertyData.subcategory === '' || propertyData.subcategory === null || propertyData.subcategory === undefined) {
            errorToast("subcategory is required feild");
            document.getElementById("tab1").click();
            subcategory.current.scrollIntoView();
            setPropertyDataError({ subcategory: "Please select subcategory!" });
            return false;
        }

        else if (propertyData.image === '' || propertyData.image === null || propertyData.image === undefined) {
            errorToast("image is required feild");
            document.getElementById("tab2").click();
            image.current.scrollIntoView();
            setPropertyDataError({ image: "Please add your property thumbnail!" });
            return false;
        }
        else if (propertyData.images === '' || propertyData.images === null || propertyData.images === undefined) {
            errorToast("images is required feild");
            document.getElementById("tab2").click();
            images.current.scrollIntoView();
            setPropertyDataError({ images: "Please images to your property Gallary" });
            return false;
        }
        else if (propertyData.state === '' || propertyData.state === null || propertyData.state === undefined) {
            errorToast("state is required feild");
            document.getElementById("tab3").click();
            state.current.scrollIntoView();
            setPropertyDataError({ state: "Please specify state!" });
            return false;
        }
        else if (propertyData.city === '' || propertyData.city === null || propertyData.city === undefined) {
            errorToast("city is required feild");
            document.getElementById("tab3").click();
            city.current.scrollIntoView();
            setPropertyDataError({ city: "Please specify city!" });
            return false;
        }
        else if (propertyData.address === '' || propertyData.address === null || propertyData.address === undefined) {
            errorToast("address is required feild");
            document.getElementById("tab3").click();
            address.current.scrollIntoView();
            setPropertyDataError({ address: "Please provide address!" });
            return false;
        }

        else if (propertyData.area === '' || propertyData.area === null || propertyData.area === undefined) {
            errorToast("area is required feild");
            document.getElementById("tab4").click();
            area.current.scrollIntoView();
            setPropertyDataError({ area: "Please specify area!" });
            return false;
        }
        else if (propertyData.default_area_unit === '' || propertyData.default_area_unit === null || propertyData.default_area_unit === undefined) {
            errorToast("default_area_unit is required feild");
            document.getElementById("tab4").click();
            default_area_unit.current.scrollIntoView();
            setPropertyDataError({ default_area_unit: "Please specify default area unit!" });
            return false;
        }


        else if (propertyData.are_you === '' || propertyData.are_you === null || propertyData.are_you === undefined) {
            errorToast("are_you is required feild");
            document.getElementById("tab6").click();
            are_you.current.scrollIntoView();
            setPropertyDataError({ are_you: "Please, let us know who you are?" });
            return false;
        }
        else if (propertyData.name_for_contact === '' || propertyData.name_for_contact === null || propertyData.name_for_contact === undefined) {
            errorToast("name_for_contact is required feild");
            document.getElementById("tab6").click();
            name_for_contact.current.scrollIntoView();
            setPropertyDataError({ name_for_contact: "Please specify your name!" });
            return false;
        }
        else if (propertyData.number_for_contact === '' || propertyData.number_for_contact === null || propertyData.number_for_contact === undefined || propertyData.number_for_contact.length < 10) {
            errorToast("number_for_contact is required feild");
            document.getElementById("tab6").click();
            number_for_contact.current.scrollIntoView();
            setPropertyDataError({ number_for_contact: "Please enter a valid 10 Digit mobile number!" });
            return false;
        }
        else if (propertyData.email_for_contact === '' || propertyData.email_for_contact === null || propertyData.email_for_contact === undefined || !emailValidator) {
            errorToast("email_for_contact is required feild");
            document.getElementById("tab6").click();
            email_for_contact.current.scrollIntoView();
            setPropertyDataError({ email_for_contact: "Please specify a valid email to contact!" });
            return false;
        }
        else {
            setPropertyDataError({ email_for_contact: "" });
            return true;
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (isValid()) {
            var addPropertyURL = Host + Endpoints.addProperty;
            Axios.post(addPropertyURL, propertyData, {
                headers: {
                    token: process.env.REACT_APP_ACCESS_TOKEN_SECRET
                }
            })
                .then((response) => {
                    console.log(response.data.error);
                    if (response.data.error === true) {
                        errorToast(response.data.title);
                    } else {
                        successToast(response.data.title);
                    }
                })
                .catch((error) => {
                    errorToast();
                })
        }
    }
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <ToastContainer />
                    <Tab.Container defaultActiveKey="tab1">
                        {/* Tabs Start */}
                        <div className="col-md-4">
                            <Nav variant="tabs" className="nav nav-tabs tab-cards">
                                <Nav.Item onClick={(e) => setStepID(1)}>
                                    <Nav.Link eventKey="tab1" id="tab1"><span>01</span> Basic Information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={(e) => setStepID(2)}>
                                    <Nav.Link eventKey="tab2" id="tab2"><span>02</span> Gallery</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={(e) => setStepID(3)}>
                                    <Nav.Link eventKey="tab3" id="tab3"><span>03</span> Location</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={(e) => setStepID(4)}>
                                    <Nav.Link eventKey="tab4" id="tab4"><span>04</span> Area & Road</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={(e) => setStepID(5)}>
                                    <Nav.Link eventKey="tab5" id="tab5"><span>05</span> Features</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={(e) => setStepID(6)}>
                                    <Nav.Link eventKey="tab6" id="tab6"><span>06</span> Details</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        {/* Tabs End */}
                        {/* Tab Content Start */}
                        <div className="col-md-8">
                            <form onSubmit={handleSubmit}>
                                <Tab.Content className="m-0">
                                    <Tab.Pane eventKey="tab1">
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label class="required">Property Name</label>
                                                <input type="text" className="form-control" placeholder="Property Name" name="title" id="title" ref={title} onChange={(e) => setPropertyData({ ...propertyData, "title": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.title}</p>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label class="required">Property Description</label>
                                                <textarea name="content" ref={description} rows={4} className="form-control" placeholder="Property Description" onChange={(e) => setPropertyData({ ...propertyData, "description": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.description}</p>

                                            </div>


                                            <div className="col-md-6 form-group">
                                                <label class="required">Property Type</label>
                                                <select className="form-control" name="propertyType" ref={property_type} onChange={(e) => setPropertyData({ ...propertyData, "property_type": e.target.value })}>
                                                    <option value="">Property Type</option>
                                                    {type.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>

                                                <p style={errorStyle}>{propertyDataError.property_type}</p>

                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label class="required">Category</label>
                                                <select className="form-control" name="category" ref={categoryRef} onChange={(e) => setPropertyData({ ...propertyData, "category": e.target.value })}>
                                                    <option value="">category</option>
                                                    {category.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>
                                                <p style={errorStyle}>{propertyDataError.category}</p>

                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label class="required">Sub category</label>
                                                <select className="form-control" name="sub_category" ref={subcategory} onChange={(e) => setPropertyData({ ...propertyData, "subcategory": e.target.value })}>
                                                    <option value="">Sub category</option>
                                                    {subCategories.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}

                                                </select>
                                                <p style={errorStyle}>{propertyDataError.subcategory}</p>

                                            </div>



                                            <div className="col-md-6 form-group">
                                                <label class="required">Property Min Price</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">&#8377;</span>
                                                    </div>
                                                    <input type="number" className="form-control" name="price" ref={price} placeholder="Property Price"
                                                        onChange={(e) => setPropertyData({ ...propertyData, "price": e.target.value })}
                                                    />

                                                </div>
                                                <p style={errorStyle}>{propertyDataError.price}</p>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label class="required">Price Per</label>
                                                <select className="form-control" name="price_per_area_unit" ref={default_area_unit} onChange={(e) => setPropertyData({ ...propertyData, "price_per_area_unit": e.target.value })}>
                                                    <option>Select</option>
                                                    {
                                                        areaUnit.map((value, index) => (
                                                            <option value={index}>{value}</option>

                                                        ))
                                                    }
                                                </select>
                                                <p style={errorStyle}>{propertyDataError.price_per_area_unit}</p>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Price Negotiable?</label>
                                                <select className="form-control" name="price_negotiable" onChange={(e) => setPropertyData({ ...propertyData, "price_negotiable": e.target.value })}>
                                                    <option>Select</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>

                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <div className="form-group">
                                            <label class="required">Property Thumbnail</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" ref={image} id="propertyThumbnail" onChange={(e) => {
                                                    uploadImage(e)
                                                }} />
                                                <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                            </div>
                                            <p style={errorStyle}>{propertyDataError.image}</p>
                                            <p style={successStyle}>{isImageSelected.image}</p>

                                        </div>
                                        <div className="form-group">
                                            <label>Youtube URL</label>
                                            <input type="text" className="form-control" placeholder="https://www.youtube.com/watch?v=m2Ux2PnJe6E" />
                                        </div>
                                        <div className="form-group">
                                            <label class="required">Add Image Gallary</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" ref={images} id="propertyGallery" multiple onChange={(e) => {
                                                    uploadMultipleImages(e);
                                                }} accept="image/*" />
                                                <label className="custom-file-label" htmlFor="propertyGallery">Choose file</label>
                                            </div>
                                            <p style={errorStyle}>{propertyDataError.images}</p>
                                            <p style={successStyle}>{isImageSelected.images}</p>

                                        </div>

                                        {/*
                                            Add price per unit in `Property Min Price`
                                            Add Youtube Video URL in step 2
                                            get State & city in step 3
                                        <div className="form-group">
                                            <label>Property Gallery</label>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <div className="dropzone-msg dz-message needsclick">
                                                    <i className="fas fa-cloud-upload-alt" />
                                                    <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                                    <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span>
                                                </div>
                                            </div>
                                            <aside className="thumbsContainer">
                                                {thumbs}
                                            </aside>
                                            <span className="acr-form-notice">*You can upload up to 5 images for your listing</span>
                                            <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span>
                                        </div>
                                        */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab3">
                                        {/*<Locationtab />*/}

                                        {/****************************Address****************************/}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label class="required">State</label>
                                                <select className="form-control" name="state" ref={state} onChange={(e) => setPropertyData({ ...propertyData, "state": e.target.value })}>
                                                    <option value="">Select State</option>
                                                    {
                                                        states.map((value, index) => (
                                                            <option value={index}>{value.state_name}</option>

                                                        ))
                                                    }

                                                </select>
                                                <p style={errorStyle}>{propertyDataError.state}</p>

                                            </div>


                                            <div className="col-md-6">
                                                <label class="required">City</label>
                                                <select className="form-control" name="city" ref={city} onChange={(e) => setPropertyData({ ...propertyData, "city": e.target.value })}>
                                                    <option value="">Select City</option>

                                                </select>
                                                <p style={errorStyle}>{propertyDataError.city}</p>

                                            </div>

                                            <div className="col-md-12">
                                                <label class="required">Address</label>
                                                <input className="form-control" placeholder="address" ref={address} name="address" onChange={(e) => setPropertyData({ ...propertyData, "address": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.address}</p>
                                            </div>
                                        </div>
                                        {/****************************Address End****************************/}


                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab4">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label class="required">Area</label>
                                                <input type="text" className="form-control" placeholder="500 Sq.ft" ref={area} name="area" onChange={(e) => setPropertyData({ ...propertyData, "area": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.area}</p>

                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label class="required">Area Unit</label>
                                                <select className="form-control" name="default_area_unit" onChange={(e) => setPropertyData({ ...propertyData, "default_area_unit": e.target.value })}>
                                                    <option>Select</option>
                                                    {areaUnit.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>
                                                <p style={errorStyle}>{propertyDataError.default_area_unit}</p>

                                            </div>


                                            <div className="col-md-6 form-group">
                                                <label>Facing</label>
                                                <select className="form-control" name="facing" onChange={(e) => setPropertyData({ ...propertyData, "facing": e.target.value })}>
                                                    <option>Select Facing</option>
                                                    {facing.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Road Type</label>
                                                <select className="form-control" name="roadtype" onChange={(e) => setPropertyData({ ...propertyData, "road_type": e.target.value })}>
                                                    <option>Select Road Type</option>
                                                    {roadType.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab5">
                                        <div className="row">
                                            {features.map((item, i) => (
                                                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                                                    <label className="acr-listing-feature">
                                                        <input type="checkbox" name={"feature" + item.id + ""} />
                                                        <i className="acr-feature-check fas fa-check" />
                                                        <i className={"acr-listing-feature-icon flaticon-" + item.icon + ""} />
                                                        {item.title}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab6">
                                        <div className="row">

                                            <div className="col-md-6 form-group">
                                                <label>Beds</label>

                                                <select className="form-control" name="beds" onChange={(e) => setPropertyData({ ...propertyData, "no_of_beds": e.target.value })}>
                                                    <option>Select beds</option>
                                                    {bedslist.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>


                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Bathrooms</label>
                                                <select className="form-control" name="bathrooms" onChange={(e) => setPropertyData({ ...propertyData, "no_of_bathrooms": e.target.value })}>
                                                    <option>Select bathrooms</option>
                                                    {bathroomslist.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>


                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Garage</label>
                                                <select className="form-control" name="garage" onChange={(e) => setPropertyData({ ...propertyData, "no_of_garage": e.target.value })}>
                                                    <option>Select garage</option>
                                                    {carspaces.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>


                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Floor</label>

                                                <select className="form-control" name="floors" onChange={(e) => setPropertyData({ ...propertyData, "floor": e.target.value })}>
                                                    <option>Select floors</option>
                                                    {floorlist.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>

                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Car spcaes</label>
                                                <select className="form-control" name="car_spaces" onChange={(e) => setPropertyData({ ...propertyData, "car_spaces": e.target.value })}>
                                                    <option>Select</option>
                                                    {carspaces.map((value, index) => (
                                                        <option value={index}>{value}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Surrounding Areas</label>
                                                <input type="text" className="form-control" placeholder="Surrounding Areas" name="surrounding_areas" onChange={(e) => setPropertyData({ ...propertyData, "surrounding_areas": e.target.value })} />
                                            </div>


                                            <div className="col-md-6 ">
                                                <label class="required">Are you</label>
                                                <select className="form-control" name="are_you" ref={are_you} onChange={(e) => setPropertyData({ ...propertyData, "are_you": e.target.value })}>

                                                    {
                                                        userTypeDrop.map((value, index) => (
                                                            <option value={index}>{value}</option>

                                                        ))
                                                    }
                                                </select>
                                                <p style={errorStyle}>{propertyDataError.are_you}</p>

                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Year Built</label>
                                                <input type="number" className="form-control" placeholder="Property Year Built" name="build_year" onChange={(e) => setPropertyData({ ...propertyData, "build_year": e.target.value })} />
                                            </div>
                                            <div className="col-md-6 ">
                                                <label>Build Type</label>
                                                <select className="form-control" name="build_type" onChange={(e) => setPropertyData({ ...propertyData, "build_type": e.target.value })}>
                                                    {
                                                        buildType.map((value, index) => (
                                                            <option value={index}>{value}</option>

                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label class="required">Contact Preson Name</label>
                                                <input type="text" className="form-control" ref={name_for_contact} placeholder="Contact Name" name="name_for_contact" onChange={(e) => setPropertyData({ ...propertyData, "name_for_contact": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.name_for_contact}</p>

                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label class="required">Contact Preson Number</label>
                                                <input type="number" className="form-control" ref={number_for_contact} placeholder="contact number" name="number_for_contact" onChange={(e) => setPropertyData({ ...propertyData, "number_for_contact": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.number_for_contact}</p>

                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label class="required">Contact Preson Email</label>
                                                <input type="text" className="form-control" placeholder="Email" name="email_for_contact" ref={email_for_contact} onChange={(e) => setPropertyData({ ...propertyData, "email_for_contact": e.target.value })} />
                                                <p style={errorStyle}>{propertyDataError.email_for_contact}</p>

                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Source From</label>
                                                <input type="text" className="form-control" placeholder="Source From" name="source_from" onChange={(e) => setPropertyData({ ...propertyData, "source_from": e.target.value })} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Available from</label>
                                                <input type="date" className="form-control" name="available_from" onChange={(e) => setPropertyData({ ...propertyData, "available_from": e.target.value })} />
                                            </div>
                                        </div>
                                        {/*
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" onChange={(e) => setPropertyData({ ...propertyData, "tandc": e.target.value })} />
                                                <label className="custom-control-label" htmlFor="termsAndConditions">I agree to the terms &amp; conditions of property submission</label>
                                            </div>
                                        </div>
                                        */}
                                        <button type="submit" className="btn-custom" name="submit">Submit Listing</button>
                                    </Tab.Pane>

                                </Tab.Content>
                            </form>
                        </div>
                    </Tab.Container>
                    {/* Tab Content End */}
                </div>
            </div>
        </div>
    );
}

export default Content;

{/*
{
    "user_id": 1,

    "price": "120000",
    "no_of_beds":1,
    "no_of_bathrooms":1,
    "no_of_garage":1,
    "address": "test add",
    "city":79715,
    "state":2067,
    "description": "test description",
    "category":1,
    "subcategory":2,
    "property_type":"buy",

    "floor":"4th floor",
    "car_spaces": "allowed",
    "price_negotiable":1,



    "surrounding_areas":"test area",
    "area":"210",
    "area_type": "build up",
    "default_area_unit":"anna",
    "road_type":"good",
    "facing":"north facing",

 
    "are_you": "agent",
    "build_year": "2018-02-20",
    "build_type":"new",

    "name_for_contact":"ajay",
    "number_for_contact":"7977319217",
    "email_for_contact":"ajay@worldindia.com",
    
    "available_from":"2018-09-20",
    
    "source_from": "other",


    //features
    "pets_considere":0,

*/}