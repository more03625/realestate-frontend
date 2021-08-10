import {
    NavLink,
    Tab,
    Nav,
} from "react-bootstrap";
import { BuyArea, RentArea, SoldArea, ShareArea, FindAgents } from "./SearchInputArea";

export const ActualSearch = () => {
    const handleSelect = (e) => {
        if (e === 'consultants') return
        window.location.href = '/' + e;
    }
    return (
        <>

            <div className="sidebar sidebar-left">
                <div className="sidebar-widget">
                    <Nav variant="tabs" defaultActiveKey="buy" className="nav nav-tabs tab-cards" onSelect={(e) => handleSelect(e)}>
                        <Nav.Item>
                            <Nav.Link eventKey="buy" >Buy</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rent">Rent</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="sold">Sold</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="share">Share</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="consultants">Find Agents</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
            <Tab.Content className="m-0">
                <Tab.Pane eventKey="buy">
                    <BuyArea />
                </Tab.Pane>
                <Tab.Pane eventKey="rent">
                    <RentArea />
                </Tab.Pane>
                <Tab.Pane eventKey="sold">
                    <SoldArea />
                </Tab.Pane>
                <Tab.Pane eventKey="share">
                    <ShareArea />
                </Tab.Pane>
                <Tab.Pane eventKey="consultants">
                    <FindAgents />
                </Tab.Pane>
            </Tab.Content>
        </>
    )
}