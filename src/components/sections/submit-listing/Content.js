import React, { useEffect, useState, useRef } from "react";
import { Tabs, Tab, Nav } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  floorlist,
  userTypeDrop,
  buildType,
  roadType,
  bedslist,
  bathroomslist,
  facing,
  carspaces,
  areaUnit,
  rooms,
  furnishing, priceOn
} from "../../../data/select.json";

import {
  Host,
  Endpoints,
  successToast,
  errorToast,
  errorStyle,
  getUserToken,
  uppercaseFirstLetter,
  lowercaseFirstLetter,
} from "../../../helper/comman_helper";
import Axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";

function Content() {
  // GOOGLE MAP
  let autoComplete;


  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {});

    autoComplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);


    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery)
    }
    );
  }
  const [propertyData, setPropertyData] = useState();

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    setPropertyData({ address: addressObject.formatted_address, latitude: addressObject.geometry.location.lat(), longitude: addressObject.geometry.location.lng() })
  }

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);


  // GOOGLE MAP

  const history = useHistory();
  const title = useRef();
  const price = useRef();
  const image = useRef();
  const images = useRef();
  const video_url = useRef();
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
  const is_contact_show = useRef();

  const errorStyle = {
    color: "red",
    fontSize: "14px",
  };
  const successStyle = {
    color: "#28a745",
    fontSize: "14px",
  };
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const { propertyID } = useParams();

  if (propertyID < 0) {
    document.getElementById("property-form").reset();
  }


  const [propertyDataError, setPropertyDataError] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [files, setFiles] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [stepID, setStepID] = useState(1);

  const [indoorFeatures, setIndoorFeatures] = useState([]);
  const [outdoorFeatures, setOutdoorFeatures] = useState([]);
  const [climateControlFeatures, setClimateControlFeatures] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategoriesWithCount, setSubCategoriesWithCount] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState();
  const [isContactShow, setIsContactShow] = useState(false);

  const [isGallarySelected, setIsGallarySelected] = useState(false);
  // CK EDITPRT
  const [content, setContent] = useState();
  const handleDescriptionChange = (e, editor) => {
    setContent(editor.getData())
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 15 || acceptedFiles.length < 4) {
        errorToast('Minimum 4 & Maximum 15 images required!')
      } else {
        setIsGallarySelected(true)
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file,
              {
                preview: URL.createObjectURL(file),
                base64: convertToBase64(file),
              })

          )
        );
      }
    }
  });

  const thumbs = files.map((file) => (
    <div className="thumb" style={thumb} key={file.name}>
      <div className="thumbInner" style={thumbInner}>
        <img src={file.preview} alt="img" style={{ objectFit: 'contain' }} />
      </div>
    </div>
  ));

  const getCategories = async () => {
    var url = Host + Endpoints.getCategories;
    var result = await Axios.get(url);
    if (result.data.error === true) {
      alert("There are some errors!");
    } else {
      setCategories(result.data.data.categories);
    }
  };
  const getSubCategories = (categoryID = '') => {
    var url = Host + Endpoints.getPropertyCounts + categoryID;
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        setSubCategoriesWithCount(response.data.data);
      }
    });
  };
  const getPropertyTypes = (categoryID = '') => {
    var url = Host + Endpoints.getPropertyTypes + categoryID;
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        setPropertyTypes(response.data.data);
      }
    });
  };

  const getIndoorFeatures = () => {

    var url = Host + Endpoints.getfeatures + "indoor";
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        setIndoorFeatures(response.data.data.features);
      }
    });
  }
  const getOutDoorFeatures = () => {
    var url = Host + Endpoints.getfeatures + "outdoor";
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        setOutdoorFeatures(response.data.data.features);
      }
    });

  }
  const getClimateControlFeatures = () => {
    var url = Host + Endpoints.getfeatures + "Climate Control";
    Axios.get(url).then((response) => {
      if (response.data.error === true) {
        alert("There are some errors!");
      } else {
        setClimateControlFeatures(response.data.data.features);
      }
    });
  }

  const handleCategoryChange = (e) => {
    setPropertyData({ ...propertyData, category: e.target.value });
    getPropertyTypes(e.target.value);
    getSubCategories(e.target.value);

  };
  const setStateLocation = (e) => {
    setPropertyData({ ...propertyData, state: e.target.value });
    getCities(e.target.value);
  }

  const handleContactShow = (e) => {
    if (e.target.value == 0) {

      setIsContactShow(true);
      setPropertyData({
        ...propertyData, name_for_contact: "Neprealestate", number_for_contact: "9656696662", email_for_contact: "admin@neprealestae.com", is_contact_show: e.target.value
      })

    } else {
      setIsContactShow(false);
      setPropertyData({
        ...propertyData, name_for_contact: "", number_for_contact: "", email_for_contact: "", is_contact_show: e.target.value
      })
    }
  }
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
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setIsImageSelected({
      ...isImageSelected,
      image: `${file.name} has been selected`,
    });
    const base64Image = await convertToBase64(file);
    setPropertyData({ ...propertyData, image: base64Image });
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const dropZoneToBase64 = async (files) => {
    var base64Images = [];
    for (var i = 0; i < files.length; i++) {
      const multipleImages = await convertToBase64(files[i]);

      base64Images.push(multipleImages);
    }
    setPropertyData({ ...propertyData, images: base64Images });
  }

  const [selectedM, setSelectedM] = useState([]);
  const onChange = (id) => {
    let find = selectedM.indexOf(id);

    if (find > -1) {
      selectedM.splice(find, 1);
    } else {
      selectedM.push(id);
    }
    setSelectedM(selectedM);

  };

  function matchYoutubeUrl(e) {
    var youtubeURL = e.target.value;
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (youtubeURL.match(p)) {
      var youtubeVideoKey = youtubeURL.split("=");
      setPropertyData({ ...propertyData, 'video_url': youtubeVideoKey[1] })
      setPropertyDataError({ ...propertyDataError, 'video_url': '' });
      return true;
    } else if (youtubeURL.length > 0) {
      setPropertyData({ ...propertyData, 'video_url': false })
      setPropertyDataError({ ...propertyDataError, 'video_url': 'Only Youtube URL allowed!' });
      return false;
    } else {
      setPropertyData({ ...propertyData, 'video_url': '' })
    }
  }

  const isValid = () => {

    var emailValidator = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(propertyData.email_for_contact);

    if (
      propertyData.title === "" ||
      propertyData.title === null ||
      propertyData.title === undefined
    ) {
      errorToast("title is required feild");
      document.getElementById("tab1").click();
      title.current.scrollIntoView();
      setPropertyDataError({ title: "title is required feild" });
      return false;
    } else if (
      propertyData.description === "" ||
      propertyData.description === null ||
      propertyData.description === undefined
    ) {
      errorToast("description is required feild");
      document.getElementById("tab1").click();
      are_you.current.scrollIntoView();
      setPropertyDataError({ description: "Please add description!" });
      return false;
    } else if (
      propertyData.property_type === "" ||
      propertyData.property_type === null ||
      propertyData.property_type === undefined
    ) {
      errorToast("property_type is required feild");
      document.getElementById("tab1").click();
      property_type.current.scrollIntoView();
      setPropertyDataError({ property_type: "Please select property type!" });
      return false;
    } else if (
      propertyData.price === "" ||
      propertyData.price === null ||
      propertyData.price === undefined
    ) {
      errorToast("price is required feild");
      document.getElementById("tab1").click();
      price.current.scrollIntoView();
      setPropertyDataError({ price: "Please add price!" });
      return false;
    }
    else if (
      propertyData.price_on === "" ||
      propertyData.price_on === null ||
      propertyData.price_on === undefined
    ) {
      errorToast("Please select price on!");
      document.getElementById("tab1").click();
      price.current.scrollIntoView();
      setPropertyDataError({ price_on: "This field is required" });
      return false;
    }
    else if (
      propertyData.category === "" ||
      propertyData.category === null ||
      propertyData.category === undefined
    ) {
      errorToast("category is required feild");
      document.getElementById("tab1").click();
      categoryRef.current.scrollIntoView();
      setPropertyDataError({ category: "Please specify property category!" });
      return false;
    } else if (
      propertyData.subcategory === "" ||
      propertyData.subcategory === null ||
      propertyData.subcategory === undefined
    ) {
      errorToast("subcategory is required feild");
      document.getElementById("tab1").click();
      subcategory.current.scrollIntoView();
      setPropertyDataError({ subcategory: "Please select subcategory!" });
      return false;
    } else if (
      propertyData.image === "" ||
      propertyData.image === null ||
      propertyData.image === undefined
    ) {
      errorToast("image is required feild");
      document.getElementById("tab2").click();
      image.current.scrollIntoView();
      setPropertyDataError({ image: "Please add your property thumbnail!" });
      return false;
    }
    else if (
      propertyData.video_url === false
    ) {

      errorToast("Please enter valid youtube URL");
      document.getElementById("tab2").click();
      image.current.scrollIntoView();
      setPropertyDataError({ video_url: "Please enter valid youtube URL" });
      return false;
    }

    else if (
      propertyData.images === "" ||
      propertyData.images === null ||
      propertyData.images === undefined
    ) {
      errorToast("images is required feild");
      document.getElementById("tab2").click();
      images.current.scrollIntoView();
      setPropertyDataError({
        images: "Please images to your property Gallary",
      });
      return false;
    }

    else if (
      propertyData.state === "" ||
      propertyData.state === null ||
      propertyData.state === undefined
    ) {
      errorToast("state is required feild");
      document.getElementById("tab3").click();
      state.current.scrollIntoView();
      setPropertyDataError({ state: "Please specify state!" });
      return false;
    } else if (
      propertyData.city === "" ||
      propertyData.city === null ||
      propertyData.city === undefined
    ) {
      errorToast("city is required feild");
      document.getElementById("tab3").click();
      city.current.scrollIntoView();
      setPropertyDataError({ city: "Please specify city!" });
      return false;
    } else if (
      propertyData.address === "" ||
      propertyData.address === null ||
      propertyData.address === undefined
    ) {
      errorToast("address is required feild");
      document.getElementById("tab3").click();
      city.current.scrollIntoView();
      setPropertyDataError({ address: "Please provide address!" });
      return false;
    } else if (
      propertyData.area === "" ||
      propertyData.area === null ||
      propertyData.area === undefined
    ) {
      errorToast("area is required feild");
      document.getElementById("tab4").click();
      area.current.scrollIntoView();
      setPropertyDataError({ area: "Please specify area!" });
      return false;
    } else if (
      propertyData.carpet_area === "" ||
      propertyData.carpet_area === null ||
      propertyData.carpet_area === undefined
    ) {
      errorToast("Carpet Area is required feild");
      document.getElementById("tab4").click();
      area.current.scrollIntoView();
      setPropertyDataError({ carpet_area: "Please specify Carpet Area!" });
      return false;
    } else if (
      propertyData.default_area_unit === "" ||
      propertyData.default_area_unit === null ||
      propertyData.default_area_unit === undefined
    ) {
      errorToast("default_area_unit is required feild");
      document.getElementById("tab4").click();
      default_area_unit.current.scrollIntoView();
      setPropertyDataError({
        default_area_unit: "Please specify default area unit!",
      });
      return false;
    }
    else if (selectedM.length === 0) {
      errorToast("Please select some features to show");
      document.getElementById("tab5").click();
      are_you.current.scrollIntoView();
      return false;
    }
    else if (
      propertyData.are_you === "" ||
      propertyData.are_you === null ||
      propertyData.are_you === undefined
    ) {
      errorToast("are_you is required feild");
      document.getElementById("tab6").click();
      are_you.current.scrollIntoView();
      setPropertyDataError({ are_you: "Please, let us know who you are?" });
      return false;
    } else if (
      propertyData.name_for_contact === "" ||
      propertyData.name_for_contact === null ||
      propertyData.name_for_contact === undefined
    ) {
      errorToast("name_for_contact is required feild");
      document.getElementById("tab6").click();
      name_for_contact.current.scrollIntoView();
      setPropertyDataError({ name_for_contact: "Please specify your name!" });
      return false;
    } else if (
      propertyData.number_for_contact === "" ||
      propertyData.number_for_contact === null ||
      propertyData.number_for_contact === undefined ||
      propertyData.number_for_contact.length < 10
    ) {
      errorToast("number_for_contact is required feild");
      document.getElementById("tab6").click();
      number_for_contact.current.scrollIntoView();
      setPropertyDataError({
        number_for_contact: "Please enter a valid 10 Digit mobile number!",
      });
      return false;
    } else if (
      propertyData.email_for_contact === "" ||
      propertyData.email_for_contact === null ||
      propertyData.email_for_contact === undefined ||
      !emailValidator
    ) {
      errorToast("email_for_contact is required feild");
      document.getElementById("tab6").click();
      email_for_contact.current.scrollIntoView();
      setPropertyDataError({
        email_for_contact: "Please specify a valid email to contact!",
      });
      return false;
    } else if (
      propertyData.is_contact_show === "" ||
      propertyData.is_contact_show === null ||
      propertyData.is_contact_show === undefined
    ) {
      errorToast("Please let us know about visibility of your contact!");
      document.getElementById("tab6").click();

      is_contact_show.current.scrollIntoView();
      setPropertyDataError({
        is_contact_show: "Please let us know about visibility of your contact!",
      });
      return false;
    } else {
      setPropertyDataError({ email_for_contact: "" });
      return true;
    }
  };
  const handleSubmit = (e) => {
    setLoadingButton(true);
    e.preventDefault();




    if (isImageSelected === false) {
      const imageObject = { image: 0 };
      Object.assign(propertyData, imageObject); // object assign is used to update the propertyData object with imagesObject
    }
    if (isGallarySelected === false) {
      const gallaryObject = { images: 0 };
      Object.assign(propertyData, gallaryObject); // object assign is used to update the propertyData object with imagesObject
    }
    Object.assign(propertyData, { 'features': selectedM, 'description': content });


    if (isValid()) {
      if (propertyData.id > 0) {
        var addPropertyURL = Host + Endpoints.editProperty;
      } else {
        var addPropertyURL = Host + Endpoints.addProperty;
      }

      Axios.post(addPropertyURL, propertyData, {
        headers: {
          token: getUserToken().token,
        },
      })
        .then((response) => {
          setLoadingButton(false);
          if (response.data.error === true) {
            errorToast(response.data.title);
          } else {
            successToast(response.data.title);
            setTimeout(function () {
              history.push("/my-listings");
            }, 1000);
          }
        })
        .catch((error) => {
          setLoadingButton(false);
          errorToast();
        });
    } else {
      setLoadingButton(false);
    }
  };
  const [imagesToPreview, setImagesToPreview] = useState([]);
  const getPropertyDetails = () => {
    if (propertyID !== undefined) {
      var url = Host + Endpoints.getPropertyDetails + propertyID;
      Axios.get(url).then((response) => {
        if (response.data.error !== true) {
          setPropertyData(response.data.data);

          var featuresObject = response.data.data.features;

          let indoor = [];
          let outdoor = [];
          let climate = [];

          const entries = Object.entries(featuresObject).map((value, index) => {
            value[1].map((featureTypeName, featureTypeIndex) => {
              if (featureTypeName.type == "Indoor Features") {
                indoor.push(featureTypeName.id);
              }
              else if (featureTypeName.type == "Outdoor Features") {
                outdoor.push(featureTypeName.id);
              } else {
                climate.push(featureTypeName.id);
              }
            });

          });
          var selectedFeaturesArray = [...indoor, ...outdoor, ...climate]; // merge three array ES6 Feature
          setSelectedM(selectedFeaturesArray);
          // Images
          var gallaryImages = JSON.parse("[" + response.data.data.images + "]")[0];

          for (var i = 0; i < gallaryImages.length; i++) {
            var preImg = [];

            var imgURL = process.env.REACT_APP_CONTENT_URL + gallaryImages[i] + ".jpg";

            fetch(imgURL)
              .then(res => res.blob())
              .then((blob) => {
                preImg.push(URL.createObjectURL(blob));
              });
          }
          setImagesToPreview(preImg);

          //set is_contact_show disabled

          response.data.data.is_contact_show == 0 ? setIsContactShow(true) : setIsContactShow(false)



        }
      });
    }
  };

  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef)
    getPropertyDetails();
    getCategories();
    getPropertyTypes();
    getSubCategories();
    getStates();
    getCities();
    getIndoorFeatures();
    getOutDoorFeatures();
    getClimateControlFeatures();
    setPropertyData({ ...propertyData, user_id: getUserToken().data.id, });
    dropZoneToBase64(files)
    files.forEach((file) => {
      URL.revokeObjectURL(file.preview)
    });
  }, [files]);
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
                  <Nav.Link eventKey="tab1" id="tab1">
                    <span>01</span> Basic Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={(e) => setStepID(2)}>
                  <Nav.Link eventKey="tab2" id="tab2">
                    <span>02</span> Gallery
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={(e) => setStepID(3)}>
                  <Nav.Link eventKey="tab3" id="tab3">
                    <span>03</span> Location
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={(e) => setStepID(4)}>
                  <Nav.Link eventKey="tab4" id="tab4">
                    <span>04</span> Area & Road
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={(e) => setStepID(5)}>
                  <Nav.Link eventKey="tab5" id="tab5">
                    <span>05</span> Features
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={(e) => setStepID(6)}>
                  <Nav.Link eventKey="tab6" id="tab6">
                    <span>06</span> Details
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {/* Tabs End */}
            {/* Tab Content Start */}
            <div className="col-md-8">
              <form autoComplete="off" id="property-form" onSubmit={handleSubmit}>
                <Tab.Content className="m-0">
                  <Tab.Pane eventKey="tab1">
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label className="required">Property Name</label>
                        <input
                          type="hidden"
                          name="form_type"
                          value={propertyID > 0 ? propertyID : 0}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Name"
                          name="title"
                          id="title"
                          ref={title}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              title: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.title
                              ? propertyData.title
                              : ""
                          }
                        />
                        <p style={errorStyle}>{propertyDataError.title}</p>
                      </div>
                      <div className="col-md-12 form-group">

                        <CKEditor
                          editor={ClassicEditor}
                          data={
                            propertyData && propertyData.description
                              ? propertyData.description
                              : ""
                          }
                          ref={description}
                          onChange={handleDescriptionChange}
                        />
                        <p style={errorStyle}>
                          {propertyDataError.description}
                        </p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="required">Category</label>
                        <select
                          className="form-control"
                          name="category"
                          ref={categoryRef}
                          onChange={(e) => handleCategoryChange(e)}
                          value={
                            propertyData && propertyData.category
                              ? propertyData.category
                              : ""
                          }
                        >
                          <option value="">category</option>
                          {categories &&
                            categories.map((value, index) => (
                              <option key={index} value={value.id}>{value.name}</option>
                            ))}
                        </select>
                        <p style={errorStyle}>{propertyDataError.category}</p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="required">Property Type</label>
                        <select
                          className="form-control"
                          name="propertyType"
                          ref={property_type}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              property_type: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.property_type
                              ? lowercaseFirstLetter(propertyData.property_type)
                              : ""
                          }
                        >
                          <option value="">Property Type</option>
                          {
                            propertyID > 0 ?
                              propertyTypes && propertyTypes.map((ptype) => (
                                <option key={ptype.id} value={lowercaseFirstLetter(ptype.name)}>
                                  {uppercaseFirstLetter(ptype.name)}
                                </option>
                              ))
                              :
                              propertyTypes && propertyTypes.filter((x) => x.name !== 'sold').map((ptype) => (
                                <option key={ptype.id} value={lowercaseFirstLetter(ptype.name)}>
                                  {uppercaseFirstLetter(ptype.name)}
                                </option>
                              ))
                          }
                        </select>

                        <p style={errorStyle}>
                          {propertyDataError.property_type}
                        </p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="required">Sub category</label>
                        <select
                          className="form-control"
                          name="sub_category"
                          ref={subcategory}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              subcategory: e.target.value,
                            })
                          }
                          value={propertyData && propertyData.subcategory ? propertyData.subcategory : ""}
                        >
                          <option value="">Sub category</option>
                          {subCategoriesWithCount &&
                            subCategoriesWithCount.map((value, index) => (
                              <option key={index} value={value.id}>{uppercaseFirstLetter(value.name)}</option>
                            ))}
                        </select>
                        <p style={errorStyle}>
                          {propertyDataError.subcategory}
                        </p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="required">Property Price</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">&#8377;</span>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            name="price"
                            ref={price}
                            placeholder="Property Price"
                            onChange={(e) =>
                              setPropertyData({
                                ...propertyData,
                                price: e.target.value,
                              })
                            }
                            defaultValue={
                              propertyData && propertyData.price
                                ? propertyData.price
                                : ""
                            }
                          />
                        </div>
                        <p style={errorStyle}>{propertyDataError.price}</p>
                      </div>
                      {/*
                                            <div className="col-md-6 form-group">
                                                <label className="required">Price Per</label>
                                                <select className="form-control" name="price_per_area_unit" ref={default_area_unit} onChange={(e) => setPropertyData({ ...propertyData, "price_per_area_unit": e.target.value })} value={propertyData && propertyData.price_per_area_unit ? propertyData.price_per_area_unit : ''}>
                                                    <option>Select</option>
                                                    {
                                                        areaUnit.map((value, index) => (
                                                            <option key={index} value={index}>{value}</option>

                                                        ))
                                                    }
                                                </select>
                                                <p style={errorStyle}>{propertyDataError.price_per_area_unit}</p>
                                            </div>
                                            */}
                      <div className="col-md-6 form-group">
                        <label className="required">Price On</label>
                        <select
                          className="form-control"
                          name="price_on"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              price_on: e.target.value,
                            })
                          }
                          value={propertyData && propertyData.price_on}
                        >
                          <option value="">Select</option>
                          {
                            priceOn && priceOn.map((value, index) => (
                              <option key={index} value={value}>{value}</option>

                            ))
                          }
                        </select>
                        <p style={errorStyle}>{propertyDataError.price_on}</p>

                      </div>

                      <div className="col-md-6 form-group">
                        <label>Price Negotiable?</label>
                        <select
                          className="form-control"
                          name="price_negotiable"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              price_negotiable: e.target.value,
                            })
                          }
                          value={propertyData && propertyData.price_negotiable == "1" ? "1" : "0"}
                        >
                          <option value="">Select</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                      </div>
                      {
                        propertyID > 0 &&
                        <div className="col-md-12 form-group">
                          <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                            Update Property
                            {loadingButton === true ?
                              <div className="ml-1 spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                              </div> : ''
                            }
                          </button>
                        </div>
                      }


                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab2">
                    <div className="form-group">
                      <label className="required">Property Thumbnail</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          ref={image}
                          id="propertyThumbnail"
                          onChange={(e) => {
                            uploadImage(e);
                          }}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="propertyThumbnail"
                        >
                          Choose file
                        </label>
                      </div>
                      <p style={errorStyle}>{propertyDataError.image}</p>
                      <p style={successStyle}>{isImageSelected.image}</p>
                      {

                        isImageSelected === false && propertyID > 0 ?
                          <p style={successStyle}>
                            <Link style={successStyle} target="_blank" to={{ pathname: propertyData && propertyData.image ? process.env.REACT_APP_CONTENT_URL + propertyData.image + ".jpg" : "" }}>This image selected as a thumbnail!</Link>
                          </p>
                          : ''
                      }
                    </div>
                    <div className="form-group">
                      <label>Youtube URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://www.youtube.com/watch?v=m2Ux2PnJe6E"
                        onChange={(e) => matchYoutubeUrl(e)}
                        ref={video_url}
                        defaultValue={
                          propertyData && propertyData.video_url
                            ? "https://www.youtube.com/watch?v=" + propertyData.video_url
                            : ""
                        }
                      />
                      <p style={errorStyle}>{propertyDataError.video_url}</p>

                    </div>
                    {/*
                    <div className="form-group">
                      <label className="required">Add Image Gallary</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          ref={images}
                          id="propertyGallery"
                          multiple
                          onChange={(e) => {
                            uploadMultipleImages(e);
                          }}
                          accept="image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="propertyGallery"
                        >
                          Choose file
                        </label>
                      </div>
                      <p style={errorStyle}>{propertyDataError.images}</p>
                      <p style={successStyle}>{isImageSelected.images}</p>
                    </div>

*/}
                    <div className="form-group">
                      <label>Property Gallery </label>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <div className="dropzone-msg dz-message needsclick">
                          <i className="fas fa-cloud-upload-alt" />
                          <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                          <span className="dropzone-msg-desc">Add images to <strong>attract customers</strong></span>
                        </div>
                      </div>
                      <aside className="thumbsContainer" style={thumbsContainer}>
                        {thumbs}
                        {
                          thumbs.length == 0 && imagesToPreview != undefined ? imagesToPreview.map((value, index) => {
                            return <div className="thumb" style={thumb} key={index}>
                              <div className="thumbInner" style={thumbInner}>
                                <img src={value} alt="img" style={{ objectFit: 'contain' }} />
                              </div>
                            </div>

                          }) : ''
                        }

                      </aside>
                      <span className="acr-form-notice">*You can upload up to 15 images for your listing</span>
                      <span className="acr-form-notice">*Upload minimum 4-8 Images to get more calls!</span>
                    </div>
                    {
                      propertyID > 0 &&
                      <div className="col-md-12 form-group">
                        <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                          Update Property
                          {loadingButton === true ?
                            <div className="ml-1 spinner-border spinner-border-sm" role="status">
                              <span className="sr-only">Loading...</span>
                            </div> : ''
                          }
                        </button>
                      </div>
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab3">
                    {/*<Locationtab />*/}

                    {/****************************Address****************************/}
                    <div className="row">
                      <div className="col-md-6">
                        <label className="required">State</label>
                        <select
                          className="form-control"
                          name="state"
                          ref={state}
                          onChange={(e) => setStateLocation(e)}
                          value={
                            propertyData && propertyData.state
                              ? propertyData.state
                              : ""
                          }
                        >
                          <option value="">Select State</option>
                          {states &&
                            states.map((value, index) => (
                              <option key={index} value={value.id}>
                                {value.state_name}
                              </option>
                            ))}
                        </select>
                        <p style={errorStyle}>{propertyDataError.state}</p>
                      </div>

                      <div className="col-md-6">
                        <label className="required">City</label>
                        <select
                          className="form-control"
                          name="city"
                          ref={city}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              city: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.city
                              ? propertyData.city
                              : ""
                          }
                        >
                          <option value="">Select City</option>
                          {cities &&
                            cities.map((value, index) => (
                              <option key={index} value={value.id}>
                                {value.city_name}
                              </option>
                            ))}
                        </select>
                        <p style={errorStyle}>{propertyDataError.city}</p>
                      </div>


                      <div className="col-md-12">
                        <label className="required">Address</label>
                        <input
                          className="form-control"
                          placeholder="address"
                          name="Type address"
                          id="enterMapAddress"
                          ref={autoCompleteRef}
                          onChange={event => setQuery(event.target.value)}
                          autoComplete="off"

                          defaultValue={propertyData && propertyData.address ? propertyData.address : ""
                          }
                        />
                        <p style={errorStyle}>{propertyDataError.address}</p>
                      </div>

                      {
                        propertyID > 0 &&
                        <div className="col-md-12 form-group">
                          <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                            Update Property
                            {loadingButton === true ?
                              <div className="ml-1 spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                              </div> : ''
                            }
                          </button>
                        </div>
                      }
                    </div>
                    {/****************************Address End****************************/}
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab4">
                    <div className="row">

                      <div className="col-md-6 form-group">
                        <label className="required">Area Unit</label>
                        <select
                          className="form-control"
                          name="default_area_unit"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              default_area_unit: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.default_area_unit
                              ? propertyData.default_area_unit
                              : ""
                          }
                        >
                          <option>Select</option>
                          {areaUnit &&
                            areaUnit.map((value, index) => (
                              <option key={index} value={value}>
                                {uppercaseFirstLetter(value)}
                              </option>
                            ))}
                        </select>
                        <p style={errorStyle}>
                          {propertyDataError.default_area_unit}
                        </p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="required">Total Area</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="500 Sq.ft"
                          ref={area}
                          name="area"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              area: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.area
                              ? propertyData.area
                              : ""
                          }
                        />
                        <p style={errorStyle}>{propertyDataError.area}</p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="required">Carpet Area</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="500 Sq.ft"
                          ref={area}
                          name="carpet_area"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              carpet_area: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.carpet_area
                              ? propertyData.carpet_area
                              : ""
                          }
                        />
                        <p style={errorStyle}>
                          {propertyDataError.carpet_area}
                        </p>
                      </div>



                      <div className="col-md-6 form-group">
                        <label>Facing</label>
                        <select
                          className="form-control"
                          name="facing"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              facing: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.facing
                              ? propertyData.facing
                              : ""
                          }
                        >
                          <option>Select Facing</option>
                          {facing &&
                            facing.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Road Type</label>
                        <select
                          className="form-control"
                          name="roadtype"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              road_type: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.road_type
                              ? propertyData.road_type
                              : ""
                          }
                        >
                          <option>Select Road Type</option>
                          {roadType &&
                            roadType.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>

                      {
                        propertyID > 0 &&
                        <div className="col-md-12 form-group">
                          <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                            Update Property
                            {loadingButton === true ?
                              <div className="ml-1 spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                              </div> : ''
                            }
                          </button>
                        </div>
                      }
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab5">
                    <Tabs
                      className="justify-content-center"
                      defaultActiveKey="1"
                      id="uncontrolled-tab-example"
                    >

                      <Tab eventKey="1" title="Indoor Features">
                        <div className="row">
                          {indoorFeatures &&
                            indoorFeatures.map((value, index) => (
                              <div
                                key={index}
                                className="col-lg-4 col-md-6 col-sm-6"
                              >
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    name={"feature_" + value.id + ""}
                                    value={value.id}
                                    onChange={() => onChange(value.id)}
                                    defaultChecked={selectedM.indexOf(value.id) > -1 ? true : false}
                                  // selected={selectedM.includes(value.id)}
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <i className="acr-listing-feature-icon">
                                    <img src={process.env.REACT_APP_CONTENT_URL + value.icon + ".jpg"} />
                                  </i>
                                  {value.feature}
                                </label>
                              </div>
                            ))}
                        </div>
                      </Tab>


                      <Tab eventKey="2" title="Outdoor Features">
                        <div className="row">
                          {outdoorFeatures &&
                            outdoorFeatures.map((value, index) => (
                              <div
                                key={index}
                                className="col-lg-4 col-md-6 col-sm-6"
                              >
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    name={"feature_" + value.id + ""}
                                    onChange={() => onChange(value.id)}
                                    defaultChecked={selectedM.indexOf(value.id) > -1 ? true : false}
                                  // selected={selectedM.includes(value.id)}
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <i className="acr-listing-feature-icon">
                                    <img src={process.env.REACT_APP_CONTENT_URL + value.icon + ".jpg"} />
                                  </i>
                                  {value.feature}
                                </label>
                              </div>
                            ))}
                        </div>
                      </Tab>

                      <Tab eventKey="3" title="Climet control & energy">
                        <div className="row">
                          {climateControlFeatures &&
                            climateControlFeatures.map((value, index) => (
                              <div
                                key={index}
                                className="col-lg-4 col-md-6 col-sm-6"
                              >
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    name={"feature_" + value.id + ""}
                                    onChange={() => onChange(value.id)}
                                    defaultChecked={selectedM.indexOf(value.id) > -1 ? true : false}
                                  // selected={selectedM.includes(value.id)}
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <i className="acr-listing-feature-icon">
                                    <img src={process.env.REACT_APP_CONTENT_URL + value.icon + ".jpg"} />
                                  </i>
                                  {value.feature}
                                </label>
                              </div>
                            ))}
                        </div>
                      </Tab>

                    </Tabs>
                    {
                      propertyID > 0 &&
                      <div className="col-md-12 form-group">
                        <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                          Update Property
                          {loadingButton === true ?
                            <div className="ml-1 spinner-border spinner-border-sm" role="status">
                              <span className="sr-only">Loading...</span>
                            </div> : ''
                          }
                        </button>
                      </div>
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab6">
                    <div className="row">
                      <div className="col-md-3 form-group">
                        <label>Beds</label>

                        <select
                          className="form-control"
                          name="beds"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              no_of_beds: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.no_of_beds
                              ? propertyData.no_of_beds
                              : ""
                          }
                        >
                          <option value="">Select beds</option>
                          {bedslist &&
                            bedslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-3 form-group">
                        <label>Number of Rooms</label>

                        <select
                          className="form-control"
                          name="no_of_rooms"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              no_of_rooms: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.no_of_rooms
                              ? propertyData.no_of_rooms
                              : ""
                          }
                        >
                          <option value="">Select Rooms</option>
                          {rooms &&
                            rooms.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-3 form-group">
                        <label>Bathrooms</label>
                        <select
                          className="form-control"
                          name="bathrooms"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              no_of_bathrooms: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.no_of_bathrooms
                              ? propertyData.no_of_bathrooms
                              : ""
                          }
                        >
                          <option>Bathrooms</option>
                          {bathroomslist &&
                            bathroomslist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-3 form-group">
                        <label>Garage</label>
                        <select
                          className="form-control"
                          name="garage"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              no_of_garage: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.no_of_garage
                              ? propertyData.no_of_garage
                              : ""
                          }
                        >
                          <option>Select garage</option>
                          {carspaces &&
                            carspaces.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-3 form-group">
                        <label>Floor</label>

                        <select
                          className="form-control"
                          name="floors"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              floor: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.floor
                              ? propertyData.floor
                              : ""
                          }
                        >
                          <option>Floors</option>
                          {floorlist &&
                            floorlist.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-3 form-group">
                        <label>Car spcaes</label>
                        <select
                          className="form-control"
                          name="car_spaces"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              car_spaces: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.car_spaces
                              ? propertyData.car_spaces
                              : ""
                          }
                        >
                          <option>Select</option>
                          {carspaces &&
                            carspaces.map((value, index) => (
                              <option key={index} value={index}>{value}</option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-3 form-group">
                        <label>Pets considered?</label>
                        <select
                          className="form-control"
                          name="pets_considere"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              pets_considere: e.target.value,
                            })
                          }
                          value={propertyData && propertyData.pets_considere == "1" ? "1" : "0"}
                        >
                          <option>Pets?</option>
                          <option value="1">YES</option>
                          <option value="0">NO</option>

                        </select>
                      </div>
                      <div className="col-md-3 form-group">
                        <label>Is Furnished?</label>
                        <select
                          className="form-control"
                          name="furnishing"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              furnishing: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.furnishing
                              ? propertyData.furnishing
                              : ""
                          }
                        >
                          <option>Furnished?</option>
                          {furnishing &&
                            furnishing.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-md-6 ">
                        <label className="required">Are you</label>
                        <select
                          className="form-control"
                          name="are_you"
                          ref={are_you}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              are_you: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.are_you
                              ? uppercaseFirstLetter(propertyData.are_you)
                              : ""
                          }
                        >
                          {userTypeDrop &&
                            userTypeDrop.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                        <p style={errorStyle}>{propertyDataError.are_you}</p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Year Built</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Property Year Built"
                          name="build_year"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              build_year: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.build_year
                              ? propertyData.build_year
                              : ""
                          }
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Build Type</label>
                        <select
                          className="form-control"
                          name="build_type"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              build_type: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.build_type
                              ? uppercaseFirstLetter(propertyData.build_type)
                              : ""
                          }
                        >
                          {buildType &&
                            buildType.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Is Under offer?</label>
                        <select
                          className="form-control"
                          name="is_under_offer"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              is_under_offer: e.target.value,
                            })
                          }
                          value={
                            propertyData && propertyData.is_under_offer == "1" ? "1" : "0"
                          }
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
                      </div>

                      <div className="col-md-6 ">
                        <label className="required">
                          Show contact on website?
                        </label>
                        <select
                          className="form-control"
                          name="is_contact_show"
                          ref={is_contact_show}
                          onChange={(e) => handleContactShow(e)}

                          value={
                            propertyData && propertyData.is_contact_show === undefined ? '' : propertyData && propertyData.is_contact_show === "1" ? "1" : "0"
                          }
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
                        <p style={errorStyle}>
                          {propertyDataError.is_contact_show}
                        </p>
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="required">Contact Preson Name</label>
                        <input
                          type="text"
                          className="form-control"
                          ref={name_for_contact}
                          placeholder="Contact Name"
                          name="name_for_contact"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              name_for_contact: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.name_for_contact
                              ? propertyData.name_for_contact
                              : ""
                          }
                          disabled={isContactShow}
                        />
                        <p style={errorStyle}>
                          {propertyDataError.name_for_contact}
                        </p>
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="required">
                          Contact Preson Number
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          ref={number_for_contact}
                          placeholder="contact number"
                          name="number_for_contact"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              number_for_contact: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.number_for_contact
                              ? propertyData.number_for_contact
                              : ""
                          }
                          disabled={isContactShow}
                        />
                        <p style={errorStyle}>
                          {propertyDataError.number_for_contact}
                        </p>
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="required">Contact Preson Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          name="email_for_contact"
                          ref={email_for_contact}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              email_for_contact: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.email_for_contact
                              ? propertyData.email_for_contact
                              : ""
                          }
                          disabled={isContactShow}
                        />
                        <p style={errorStyle}>
                          {propertyDataError.email_for_contact}
                        </p>
                      </div>

                      <div className="col-md-6 form-group">
                        <label>Source From</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Source From"
                          name="source_from"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              source_from: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.source_from
                              ? propertyData.source_from
                              : ""
                          }
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Available from</label>
                        <input
                          type="date"
                          className="form-control"
                          name="available_from"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              available_from: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.available_from
                              ? propertyData.available_from
                              : ""
                          }
                        />
                      </div>

                      <div className="col-md-12 form-group">
                        <label>Keywords</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Keywords to rank on NepRealEstate"
                          name="keywords"
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              keywords: e.target.value,
                            })
                          }
                          defaultValue={
                            propertyData && propertyData.keywords
                              ? propertyData.keywords
                              : ""
                          }
                        />
                      </div>
                    </div>




                    {
                      propertyID > 0 &&

                      <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                        Update Property
                        {loadingButton === true ?
                          <div className="ml-1 spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                          </div> : ''
                        }
                      </button>
                    }

                    {
                      propertyID == undefined &&
                      <button type="submit" className="btn-custom btn-block" name="submit" disabled={loadingButton}>
                        Add Property
                        {loadingButton === true ?
                          <div className="ml-1 spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                          </div> : ''
                        }
                      </button>
                    }


                  </Tab.Pane>
                </Tab.Content>
              </form>
            </div>
          </Tab.Container>
          {/* Tab Content End */}
        </div>
      </div>
    </div >
  );
}

export default Content;
