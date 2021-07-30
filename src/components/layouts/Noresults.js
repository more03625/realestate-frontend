import { Link } from "react-router-dom";

export const Noresults = () => {
    return (
        <div className="acr-empty-section">
            <i className="flaticon-home" />
            <h3>Ohh, There are no results found!</h3>
            <p>Please try to modify your search! Or Go back to the home page</p>
            <Link to="/home" className="btn-custom">Go to home</Link>
        </div>
    )
}