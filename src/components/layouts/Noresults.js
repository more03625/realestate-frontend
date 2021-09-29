import { Link } from "react-router-dom";

export const Noresults = ({ messageOn }) => {
    return (
        messageOn === 'agents' ? (
            <div className="acr-empty-section">
                <i className="flaticon-home" />
                <h3>There are no properties </h3>
                <p>It seems like there are no properties by this user you can checkout other agents below!</p>
                <Link to="/consultants" className="btn-custom">Search Agents</Link>
            </div>
        ) : (
            <div className="acr-empty-section">
                <i className="flaticon-home" />
                <h3>Ohh, There are no results found!</h3>
                <p>Please try to modify your search! Or Go back to the home page</p>
                <Link to="/home" className="btn-custom">Go to home</Link>
            </div>
        )
    )
}