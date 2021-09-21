import { red } from "chalk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Host =
    window.location.host === "neprealestate.com" ? "http://neprealestate.com:5254" : "http://localhost:5254"; //Node URL

export const Endpoints = {
    Login: "/users/login",
    Register: "/users/register",
    isAuthenticated: "/isAuthenticated",
    updateProfile: "/users/updateProfile",
    verifyOtp: "/users/verifyOtp",
    resendOtp: "/users/resendOtp",
    changePassword: "/users/changePassword",
    getStates: "/users/getStates",
    getRecentNews: "/news/getRecentNews",
    getNews: "/news/getNews",
    getNewsDetails: "/news/getNewsDetails?id=",
    contactUs: "/users/contact_us",
    forgotPassword: "/users/forgotPassword",
    ResetPassword: "/users/resetPassword",
    getPropertyDetails: "/property/getPropertyDetails?id=",
    getRecentProperties: "/property/getRecentProperties",
    getPropertiesBySellerID: "/property/getPropertiesBySellerID",
    getProperties: "/property/getProperties",
    addProperty: "/property/addProperty",
    getSubCategories: "/admin/getSubCategories",
    getCities: "/users/getCities?id=",
    getPropertiesWithFilters: '/property/getPropertiesWithFilters',
    editProperty: "/property/editProperty",
    getUserById: "/admin/getUserById?id=",
    getProfileDetails: "/users/getProfileDetails",
    getPropertyCounts: "/property/getPropertyCounts?id=",
    getCategories: "/admin/getCategories",
    getPropertyTypes: "/users/getPropertyTypes?id=",
    getfeatures: "/admin/getfeatures?type=",
    addSubscriber: "/users/addSubscriber",
    propertyEnquiry: "/users/properties_enquiry",
    agentList: "/admin/agentList",
    editSettings: "/admin/edit-settings",
    getSettingBySlug: "/admin/get-settings-by-slug",
    getDistricts: "/admin/getDistricts",
    getAreaAddresses: "/admin/getAreaAddresses",
    getCitiesAdmin: "/admin/getCities",
    getAreaAddresses: "/admin/getAreaAddresses"


};

export const openInGmail = (to, subject = '', body = '', cc = null, bcc = null) => {
    // var subject = "This is subject";
    // var body = "This is body";
    var mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    return mailLink;
}
export const uppercaseFirstLetter = (string) => {
    return string && string[0].toUpperCase() + string.slice(1);
}
export const lowercaseFirstLetter = (string) => {
    return string && string[0].toLowerCase() + string.slice(1);
}
export const saveProperty = (propertyID) => {
    alert(`Ok, i will save this property if you are logged in. PropertyID is ${propertyID}`);
}

export const convertToSlug = (blogTitle) => {
    return blogTitle
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
};

export const successToast = (message = "✅" + " Success!") => {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const errorToast = (message = "❌" + " Error") => {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
export const getUserToken = () => {
    return JSON.parse(localStorage.getItem('token'));
}
export const cleanObject = (obj) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
        }
    }
    return obj
}