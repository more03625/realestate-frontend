import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Locationtab from './Locationtab';

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
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

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

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <Tab.Container defaultActiveKey="tab1">
                        {/* Tabs Start */}
                        <div className="col-md-4">
                            <Nav variant="tabs" className="nav nav-tabs tab-cards">
                                <Nav.Item>
                                    <Nav.Link eventKey="tab1"><span>01</span> Basic Information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab2"><span>02</span> Gallery</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab3"><span>03</span> Location</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab4"><span>04</span> Features</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab5"><span>05</span> Details</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        {/* Tabs End */}
                        {/* Tab Content Start */}
                        <div className="col-md-8">
                            <form>
                                <Tab.Content className="m-0">
                                    <Tab.Pane eventKey="tab1">
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Property Description</label>
                                                <textarea name="content" rows={4} className="form-control" placeholder="Property Description" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Name</label>
                                                <input type="text" className="form-control" placeholder="Property Name" name="name" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Status</label>
                                                <select className="form-control" name="status">
                                                    <option value="For Rent">For Rent</option>
                                                    <option value="Featured">Featured</option>
                                                    <option value="For Sale">For Sale</option>
                                                    <option value="Leased">Leased</option>
                                                    <option value="New Addition">New Addition</option>
                                                    <option value="Sold">Sold</option>
                                                    <option value="Rental">Rental</option>
                                                    <option value="Reduced">Reduced</option>
                                                    <option value="Special Offer">Special Offer</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Property Type</label>
                                                <select className="form-control" name="type">
                                                    <option value="House">House</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Condo">Condo</option>
                                                    <option value="Townhome">Townhome</option>
                                                    <option value="Villa">Villa</option>
                                                    <option value="Duplex">Duplex</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Price</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">$</span>
                                                    </div>
                                                    <input type="text" className="form-control" name="price" placeholder="Property Price" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Rental Period</label>
                                                <select className="form-control" name="period">
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Space (Sqft)</label>
                                                <input type="text" className="form-control" placeholder="Property Space (Sqft)" name="space" />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label>Property Video</label>
                                                <input type="text" className="form-control" placeholder="Property Video URL" name="video" />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <div className="form-group">
                                            <label>Property Thumbnail</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="propertyThumbnail" />
                                                <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                            </div>
                                        </div>
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
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab3">
                                        <Locationtab/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab4">
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
                                    <Tab.Pane eventKey="tab5">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>Property ID</label>
                                                <input type="text" className="form-control" placeholder="Property ID" name="id" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Beds</label>
                                                <input type="text" className="form-control" placeholder="Number of Beds" name="beds" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Bathrooms</label>
                                                <input type="text" className="form-control" placeholder="Number of Bathrooms" name="baths" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Condition</label>
                                                <input type="text" className="form-control" placeholder="Property Condition" name="condition" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Year Built</label>
                                                <input type="text" className="form-control" placeholder="Property Year Built" name="built" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Neighborhood</label>
                                                <input type="text" className="form-control" placeholder="Property Neighborhood" name="neighborhood" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" />
                                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the terms &amp; Conditions of Property Submission</label>
                                            </div>
                                        </div>
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