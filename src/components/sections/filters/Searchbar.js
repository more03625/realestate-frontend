const Searchbar = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search region, suburb or postcode"
          />
        </div>
      </div>
    </>
  );
};
export default Searchbar;
