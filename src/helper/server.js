export const Host =
  window.location.host === "localhost:3000" || "localhost:3001"
    ? "http://localhost:5254/"
    : "http://neprealestate.com:5254/";

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
  getPropertiesBySellerID: "property/getPropertiesBySellerID"
};

export const convertToSlug = (blogTitle) => {
  return blogTitle
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
