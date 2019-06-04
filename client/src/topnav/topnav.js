import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import AuthButtons from './authbuttons';

const TopNav = () => {
    return(
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <NavbarBrand href="/">Goals Tracker</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="https://github.com/HousewifeHacker/mernTodo">Github</NavLink>
                </NavItem>
                <NavItem>
                    <AuthButtons />
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default TopNav;
