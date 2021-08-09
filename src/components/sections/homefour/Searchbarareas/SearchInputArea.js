import { Searchoptions, SearchButton } from "./Searchoptions";

export const BuyArea = () => {
    const propertyType = 'buy';
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
                        <Searchoptions propertyType={propertyType} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const RentArea = () => {
    const propertyType = 'rent';
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

    const propertyType = 'sold';
    return (<div className="agency-content">
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
    const propertyType = 'share';
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
                <form method="get" action="/find-agents">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Find agents here..."
                            name="search"
                        />
                        <input type="hidden" name="property_type" value="consultants" />
                        <SearchButton />
                    </div>


                </form>
            </div>
        </div>
    )
}