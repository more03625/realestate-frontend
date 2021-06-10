import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Pages
const Home = React.lazy(() => import("./components/pages/Home"));
const Hometwo = React.lazy(() => import("./components/pages/Hometwo"));
const Homethree = React.lazy(() => import("./components/pages/Homethree"));
const Homefour = React.lazy(() => import("./components/pages/Homefour"));
const Homefive = React.lazy(() => import("./components/pages/Homefive"));
// Blog
const Bloggrid = React.lazy(() => import("./components/pages/Bloggrid"));
const Bloglist = React.lazy(() => import("./components/pages/Bloglist"));
const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
// Pages
const About = React.lazy(() => import("./components/pages/About"));
const Services = React.lazy(() => import("./components/pages/Services"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Pricing = React.lazy(() => import("./components/pages/Pricing"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Legal = React.lazy(() => import("./components/pages/Legal"));
// Listings
const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));
const Listinglist = React.lazy(() => import("./components/pages/Listinglist"));
const Listingmap = React.lazy(() => import("./components/pages/Listingmap"));
const Listingdetailsone = React.lazy(() => import("./components/pages/Listingdetailsone"));
const Listingdetailstwo = React.lazy(() => import("./components/pages/Listingdetailstwo"));
const Listingdetailsthree = React.lazy(() => import("./components/pages/Listingdetailsthree"));
const Submitlisting = React.lazy(() => import("./components/pages/Submitlisting"));
const Comparelistings = React.lazy(() => import("./components/pages/Comparelistings"));
// Agents
const Agentarchive = React.lazy(() => import("./components/pages/Agentarchive"));
const Agentdetails = React.lazy(() => import("./components/pages/Agentdetails"));
const Profile = React.lazy(() => import("./components/pages/Profile"));
const Profilelistings = React.lazy(() => import("./components/pages/Profilelistings"));
const Profilesavedlistings = React.lazy(() => import("./components/pages/Profilesavedlistings"));
// Agency
const Agencyarchive = React.lazy(() => import("./components/pages/Agencyarchive"));
const Agencydetails = React.lazy(() => import("./components/pages/Agencydetails"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          {/* Homepages */}
          <Route exact path="/" component={Home} />
          <Route path="/home-v2" component={Hometwo} />
          <Route path="/home-v3" component={Homethree} />
          <Route path="/home-v4" component={Homefour} />
          <Route path="/home-v5" component={Homefive} />
          {/* Blog */}
          <Route path="/blog-grid" component={Bloggrid} />
          <Route path="/blog-list" component={Bloglist} />
          <Route path="/blog-single" component={Blogsingle} />
          {/* Pages */}
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/faq" component={Faq} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/contact" component={Contact} />
          <Route path="/coming-soon" component={Comingsoon} />
          <Route path="/error-404" component={Error} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/legal" component={Legal} />
          {/* Listings */}
          <Route path="/listing-grid" component={Listinggrid} />
          <Route path="/listing-list" component={Listinglist} />
          <Route path="/listing-map" component={Listingmap} />
          <Route path="/listing-details-v1" component={Listingdetailsone} />
          <Route path="/listing-details-v2" component={Listingdetailstwo} />
          <Route path="/listing-details-v3" component={Listingdetailsthree} />
          <Route path="/submit-listing" component={Submitlisting} />
          <Route path="/compare-listings" component={Comparelistings} />
          {/* Agents */}
          <Route path="/agent-archive" component={Agentarchive} />
          <Route path="/agent-details" component={Agentdetails} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile-listings" component={Profilelistings} />
          <Route path="/profile-saved-listings" component={Profilesavedlistings} />
          {/* Agency */}
          <Route path="/agency-archive" component={Agencyarchive} />
          <Route path="/agency-details" component={Agencydetails} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
