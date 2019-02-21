import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class TopNav extends Component {
    render() {
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href="/">Goals Tracker</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/HousewifeHacker/mernTodo">Github</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
