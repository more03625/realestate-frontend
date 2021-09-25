import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import listing from "../../../data/listings.json";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import { openInGmail, successToast, errorToast, Endpoints, Host, convertToSlug, getUserToken, uppercaseFirstLetter, cleanObject } from "../../../helper/comman_helper";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Listingproperties from "../property-results/Listingproperties";
import PaginationLogic from "../pagination-logic/PaginationLogic";
import Loader from "../../layouts/Loader";

const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Ropani-Aana-Paisa-Daam</Tooltip>;
const Content = ({ userData }) => {
  const [myProperties, setMyProperties] = useState([]);
  // Pagination
  const [totalResults, setTotalResults] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMyProperties = async () => {
    var url = Host + Endpoints.getPropertiesBySellerID;
    var data = {
      "id": getUserToken().data.id,
      limit: limit,
      offset: offset
    }
    const result = await Axios.post(url, cleanObject(data), {
      headers: {
        token: getUserToken().token
      }
    });
    if (result.data.error === true) {
      errorToast(result.data.title);
    } else {
      setTotalResults(result.data.data.total);
      setMyProperties(result.data.data.users);
    }

  }
  useEffect(() => {
    getMyProperties();
  }, [offset]);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <ToastContainer />
          <div className="col-lg-4">
            <div className="sidebar sticky-sidebar user-nav sidebar-left">
              <ul>
                <li>
                  {" "}
                  <Link to="/profile"> Edit Profile</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link className="active" to="/my-listings">
                    My Listings
                  </Link>{" "}
                </li>
                {/*
                  <li>
                    {" "}
                    <Link to="/profile-saved-listings">
                      Saved Listings
                    </Link>{" "}
                  </li>
                  */}
                <li>
                  {" "}
                  <Link className="logout" to="/logout">
                    <i className="flaticon-shut-down-button" /> Logout
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            {/* Listing Start */}

            {totalResults === undefined ? <Loader /> : totalResults === 0 ?
              <div className="container text-center ">
                <div className="row justify-content-center">
                  <h5>There are no properties to show!</h5>
                </div>
                <div className="row justify-content-center">
                  <p>Start adding properties by clicking on Add properties!</p>
                </div>
                <div className="row justify-content-center">
                  <Link to="/add-property" className="btn-custom secondary mr-0">Add Properties <i className="fas mr-0 fa-plus" /> </Link>
                </div>
              </div>
              :
              (
                <>
                  <Listingproperties properties={myProperties} />
                  <PaginationLogic
                    setLoading={setLoading}
                    setOffset={setOffset}
                    setCurrentPage={setCurrentPage}
                    loading={loading}
                    offset={offset}
                    currentPage={currentPage}
                    totalResults={totalResults}
                    limit={limit}
                  />
                </>
              )}
            {/* Listing End */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
