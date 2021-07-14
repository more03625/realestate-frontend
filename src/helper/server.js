export const Host =
  window.location.host === "localhost:3000"
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
};
