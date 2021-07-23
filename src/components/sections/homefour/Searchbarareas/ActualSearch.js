import {
    NavLink,
    Tab,
    Nav,
} from "react-bootstrap";
import { BuyArea, RentArea, SoldArea, ShareArea, FindAgents } from "./SearchInputArea";

export const ActualSearch = () => {
    return (
        <>

            <div className="sidebar sidebar-left">
                <div className="sidebar-widget">
                    <Nav variant="tabs" className="nav nav-tabs tab-cards">
                        <Nav.Item>
                            <NavLink eventKey="buy">Buy</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rent">Rent</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="sold">Sold</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="share">share</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="findAgents">Find Agents</Nav.Link>
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
                <Tab.Pane eventKey="findAgents">
                    <FindAgents />
                </Tab.Pane>
            </Tab.Content>
        </>
    )
}