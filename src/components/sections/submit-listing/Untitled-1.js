<div className="col-lg-6 col-md-6">
<div className="listing-feature-wrapper">

    <div className="listing-feature">
        <i className="flaticon-bone" />
        <h6 className="listing-feature-label">
            Pet Friendly
        </h6>
        <span className="listing-feature-value">
            {propertyDetails &&
                propertyDetails.pets_considere === 0
                ? "NO"
                : "YES"}
        </span>
    </div>
    <div className="listing-feature">
        <i className="flaticon-eye" />
        <h6 className="listing-feature-label">Facing</h6>
        <span className="listing-feature-value">
            {propertyDetails && propertyDetails.facing
                ? propertyDetails.facing
                : ""}
        </span>
    </div>
    {/*
            <div className="listing-feature">
                <i className="flaticon-chair" />
                <h6 className="listing-feature-label">Pen Furnished</h6>
                <span className="listing-feature-value">{propertyDetails && propertyDetails.property_type ? propertyDetails.property_type : ''}</span>
            </div>
            <div className="listing-feature">
                <i className="flaticon-fan" />
                <h6 className="listing-feature-label">Pen Cooling</h6>
                <span className="listing-feature-value">{propertyDetails && propertyDetails.property_type ? propertyDetails.property_type : ''}</span>
            </div>
            */}
</div>
</div>

<div className="col-lg-6 col-md-6">
<div className="listing-feature-wrapper">
    <div className="listing-feature">
        <i className="flaticon-bathroom" />
        <h6 className="listing-feature-label">Bathrooms</h6>
        <span className="listing-feature-value">
            {propertyDetails && propertyDetails.no_of_bathrooms
                ? propertyDetails.no_of_bathrooms
                : ""}
        </span>
    </div>
    <div className="listing-feature">
        <i className="flaticon-pillow" />
        <h6 className="listing-feature-label">Bed Rooms</h6>
        <span className="listing-feature-value">
            {propertyDetails && propertyDetails.no_of_beds
                ? propertyDetails.no_of_beds
                : ""}
        </span>
    </div>

    <div className="listing-feature">
        <i className="flaticon-ruler" />
        <h6 className="listing-feature-label">
            Property Size
        </h6>
        <span className="listing-feature-value">
            {propertyDetails && propertyDetails.area
                ? propertyDetails.area
                : ""}{" "}
            {propertyDetails &&
                propertyDetails.default_area_unit
                ? propertyDetails.default_area_unit
                : ""}
        </span>
    </div>
</div>
</div>
