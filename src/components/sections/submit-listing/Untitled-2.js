


                                        <div className="sidebar sticky-sidebar">
                                        <div className="sidebar-widget">
                                            <h5>Contact Person</h5>
                                            {/* Author Start */}


                                            <div className="media sidebar-author listing-agent">
                                                <Link to="#">
                                                    <img
                                                        src={propertyDetails.profile_image != null ? process.env.REACT_APP_CONTENT_URL + propertyDetails.profile_image + "_small.jpg" : process.env.REACT_APP_CONTENT_URL + "/users/default.png"}
                                                        alt={propertyDetails.profile_image + "_small.jpg"}
                                                    />

                                                </Link>
                                                <div className="media-body">
                                                    <h6>
                                                        {" "}

                                                        <Link to="#">{propertyDetails && propertyDetails.name_for_contact ? propertyDetails.name_for_contact : ''}</Link>{" "}
                                                    </h6>
                                                    {/*<span>{propertyDetails && propertyDetails.type ? propertyDetails.type : 'MKBHD'}</span>*/}
                                                </div>
                                                {/* 

                                                <Dropdown className="options-dropdown">
                                                    <Dropdown.Toggle as={NavLink}>
                                                        <i className="fas fa-ellipsis-v" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu-right">
                                                        <ul>
                                                            <li>
                                                                {" "}
                                                                <Link to={{ pathname: `tel:${propertyDetails && propertyDetails.number_for_contact ? propertyDetails.number_for_contact : ''}` }}>
                                                                    {" "}
                                                                    <i className="fas fa-phone" /> Call Agent
                                                                </Link>{" "}
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <Link to="/listing-grid">
                                                                    {" "}
                                                                    <i className="fas fa-th-list" /> View Listings
                                                                </Link>{" "}
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <Link to="#">
                                                                    {" "}
                                                                    <i className="fas fa-star" /> Save Agent
                                                                </Link>{" "}
                                                            </li>
                                                        </ul>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                Author End */}
                                            </div>

                                            {/* Contact Start */}
                                            {
                                                propertyDetails && propertyDetails.is_contact_show === 1 &&
                                                <>

                                                    <div className="form-group">
                                                        <b>Phone: &nbsp;&nbsp;</b>{propertyDetails && propertyDetails.number_for_contact ? propertyDetails.number_for_contact : ''}

                                                    </div>
                                                    <div className="form-group">
                                                        <b>Email: &nbsp;&nbsp;</b>{propertyDetails && propertyDetails.email_for_contact ? propertyDetails.email_for_contact : ''}
                                                    </div>
                                                </>
                                            }


                                            {/* Contact End */}
                                        </div>
                                        










                                    <div className="section pt-0" id="book_tour">
                                    <h4>Schedule Link tour</h4>
                                    <form onSubmit={submitFun}>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    name="fname"
                                                    onChange={(e) => setFname(e.target.value)}
                                                />
                                           
                                            </div>
                                            <div className="col-md-6 form-group">
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
                                            <div className="col-md-6 form-group">
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
                                            <div className="col-md-6 form-group">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Date"
                                                    name="date"
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {dateError}
                                                </p>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Type your comment..."
                                                    name="comment"
                                                    onChange={(e) => setComment(e.target.value)}
                                                    rows={7}
                                                />
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {commentError}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn-custom primary"
                                            name="button"
                                        >
                                            Schedule Tour
                                        </button>
                                    </form>
                                </div>