import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoggedInProtected from "./components/sections/protected/LoggedInProtected";
import Protected from "./components/sections/protected/Protected";

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// RAHULS START
const News = React.lazy(() => import("./components/pages/News"));
const Newsdetail = React.lazy(() => import("./components/pages/Newsdetail"));
const Results = React.lazy(() => import("./components/pages/Searchnews"));

const Forgotpassword = React.lazy(() =>
  import("./components/pages/Forgotpassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/pages/ResetPassword")
);

const Privacypolicy = React.lazy(() =>
  import("./components/pages/Privacypolicy")
);
const Logout = React.lazy(() => import("./components/pages/Logout"));
const Verification = React.lazy(() => import("./components/pages/Verification"));
const CommingSoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Propertydetails = React.lazy(() => import("./components/pages/Propertydetails"));
const Home = React.lazy(() => import("./components/pages/Home"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Submitlisting = React.lazy(() => import("./components/pages/Submitlisting"));
const Agentarchive = React.lazy(() => import("./components/pages/Agentarchive"));
const Agentdetails = React.lazy(() => import("./components/pages/Agentdetails"));
const Profile = React.lazy(() => import("./components/pages/Profile"));
const Profilelistings = React.lazy(() => import("./components/pages/Profilelistings"));
const Propertyresults = React.lazy(() => import("./components/pages/Propertyresults"));
const Alertssubscribe = React.lazy(() => import("./components/pages/Alertssubscribe"));

// const Legal = React.lazy(() => import("./components/pages/Legal"));
const Icons = React.lazy(() => import("./components/pages/Icons"));
// const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));
// const Listinglist = React.lazy(() => import("./components/pages/Listinglist"));
// const Listingmap = React.lazy(() => import("./components/pages/Listingmap"));
// const Listingdetailsone = React.lazy(() =>import("./components/pages/Listingdetailsone"));
// const Listingdetailstwo = React.lazy(() =>import("./components/pages/Listingdetailstwo"));
// const Listingdetailsthree = React.lazy(() =>import("./components/pages/Listingdetailsthree"));
// const Comparelistings = React.lazy(() =>import("./components/pages/Comparelistings"));
// const Homethree = React.lazy(() => import("./components/pages/Homethree"));
// const Homefour = React.lazy(() => import("./components/pages/Homefour"));
// const Homefive = React.lazy(() => import("./components/pages/Homefive"));
// const Bloglist = React.lazy(() => import("./components/pages/Bloglist"));
// const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
// const Profilesavedlistings = React.lazy(() =>import("./components/pages/Profilesavedlistings"));
// const Agencyarchive = React.lazy(() => import("./components/pages/Agencyarchive"));
// const Agencydetails = React.lazy(() =>import("./components/pages/Agencydetails"));
// const Services = React.lazy(() => import("./components/pages/Services"));
// const Faq = React.lazy(() => import("./components/pages/Faq"));
// const Pricing = React.lazy(() => import("./components/pages/Pricing"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          {/* RAHUL */}
          <Route exact path="/news" component={News} />
          <Route path="/results" component={Results} />
          <Route exact path="/read/news/:slug/:newsID" component={Newsdetail} />
          <Route path="/property-results" component={Propertyresults} />
          <Route path="/rent" component={Home} />
          <Route path="/buy" component={Home} />
          <Route path="/sold" component={Home} />
          <Route path="/share" component={Home} />
          <Route path="/consultants" component={Home} />
          <Route path="/commercial" component={Propertyresults} />
          <Route path="/property/:slug/:propertyID" component={Propertydetails} />
          <Route path="/about" component={Privacypolicy} />
          <Route path="/terms-and-conditions" component={Privacypolicy} />
          <Route path="/privacy-policy" component={Privacypolicy} />
          <Route path="/rent-agreement" component={Privacypolicy} />
          <Route path="/disclaimers" component={Privacypolicy} />
          <Route path="/user-agreement" component={Privacypolicy} />
          <Route exact path="/" component={CommingSoon} />
          <Route path="/home" component={Home} />
          <Route path="/demosite" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/coming-soon" component={Comingsoon} />
          <Route path="/error-404" component={Error} />
          <Route path="/find-agents" component={Agentarchive} />
          <Route path="/agent-details" component={Agentdetails} />
          <Route path="/agent/:agentName/:agentID" component={Agentdetails} />
          <Route path="/subscribe-for-alerts" component={Alertssubscribe} />


          {/*Protected*/}
          <Route path="/login">
            <LoggedInProtected component={Login} />
          </Route>

          <Route path="/logout" component={Logout} />
          <Route path="/verification" component={Verification} />

          <Route path="/register">
            <LoggedInProtected component={Register} />
          </Route>

          <Route path="/add-property">
            <Protected component={Submitlisting} />
          </Route>

          <Route path="/edit-property/:slug/:propertyID">
            <Protected component={Submitlisting} />
          </Route>
          <Route path="/profile">
            <Protected component={Profile} />
          </Route>
          <Route path="/my-listings">
            <Protected component={Profilelistings} />
          </Route>
          <Route path="/forgot-password">
            <LoggedInProtected component={Forgotpassword} />
          </Route>
          <Route path="/resetPassword/:remember_token">
            <LoggedInProtected component={ResetPassword} />
          </Route>

          <Route path="*" component={Error} />
          {/*Un-used*/}
          {/* 
            * <Route path="/rent" component={Rent} />
            * <Route path="/buy" component={Buy} />
            * <Route path="/sold" component={Sold} />
            * <Route path="/share" component={Share} /> 
            * <Route path="/blog-list" component={Bloglist} />
            * <Route path="/blog-single" component={Blogsingle} />
            * <Route path="/consultants" component={Propertyconsultants} />
            * <Route path="/property-listing" component={Commercial} />
            * <Route path="/services" component={Services} />
            * <Route path="/faq" component={Faq} />
            * <Route path="/pricing" component={Pricing} />
            * <Route path="/home-v3" component={Homethree} />
            * <Route path="/home-v4" component={Homefour} />
            * <Route path="/home-v5" component={Homefive} />
            * <Route path="/legal" component={Legal} />
            * <Route path="/icons" component={Icons} />
            * Listings 
            * <Route path="/listing-grid" component={Listinggrid} />
            * <Route path="/listing-list" component={Listinglist} />
            * <Route path="/listing-map" component={Listingmap} />
            * <Route path="/listing-details-v1" component={Listingdetailsone} />
            * <Route path="/listing-details-v2" component={Listingdetailstwo} />
            * <Route path="/listing-details-v3" component={Listingdetailsthree} />
            * <Route path="/compare-listings" component={Comparelistings} />
            * <Route path="/agent-archive" component={Agentarchive} />
            * <Route path="/agency-archive" component={Agencyarchive} />
            * <Route path="/agency-details" component={Agencydetails} />
            * <Route path="/profile-saved-listings" component={Profilesavedlistings} />
            */}

          {/* Agency */}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
