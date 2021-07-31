import { Searchoptions, SearchButton } from "./Searchoptions";

export const BuyArea = () => {
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Properties to own..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="buy" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const RentArea = () => {
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search properties to rent..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="rent" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const SoldArea = () => {
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for sold properties..."
                            name="search"
                        />
                        <i className="flaticon-search"></i>
                        <input type="hidden" name="property_type" value="sold" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}
export const ShareArea = () => {
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search shared properties..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="share" />
                        <SearchButton />
                    </div>

                    <div className="row">
                        <Searchoptions />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const FindAgents = () => {
    return (
        <div className="agency-content">
            <div className="sidebar-widget">
                <form method="get" action="/property-results">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Find agents here..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="findagent" />
                        <SearchButton />
                    </div>

                    <div className="row">

                    </div>
                </form>
            </div>
        </div>
    )
}