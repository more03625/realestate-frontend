import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Endpoints = {
    Login: "users/login",
    Register: "users/register",
    isAuthenticated: "isAuthenticated",
    updateProfile: "users/updateProfile",
    verifyOtp: "users/verifyOtp",
    resendOtp: "users/resendOtp",
    changePassword: "users/changePassword",
    getStates: "users/getStates",
    getRecentNews: "news/getRecentNews",
    getNews: "news/getNews",
    getNewsDetails: "news/getNewsDetails?id=",
    contactUs: "users/contact_us",
    forgotPassword: "users/forgotPassword",
    ResetPassword: "users/resetPassword",
    getPropertyDetails: "property/getPropertyDetails?id=",
    getRecentProperties: "property/getRecentProperties",
    getPropertiesBySellerID: "property/getPropertiesBySellerID",
    getProperties: "property/getProperties"
};

export const openInGmail = (to, cc = null, bcc = null) => {

    var subject = "This is subject";
    var body = "This is body";
    var mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    return mailLink;
}
export const uppercaseFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}
export const saveProperty = (propertyID) => {
    alert(`Ok, i will save this property number ${propertyID}`);
}

export const Host =
    window.location.host === "localhost:3000" || "localhost:3001"
        ? "http://localhost:5254/"
        : "http://neprealestate.com:5254/";

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