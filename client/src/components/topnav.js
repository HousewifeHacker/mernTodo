import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class TopNav extends Component {
    renderAuthLinks = () => {
        let token = this.props.isLoggedIn;
        if (!token) {
            return (
                <div>
                    <Button
                        outline
                        color="link"
                        tag={Link}
                        to="/signin">
                            Sign In
                    </Button>
                    <Button
                        outline
                        color="link"
                        tag={Link}
                        to="/signup">
                            Sign Up
                    </Button>
                </div>
            );
        } else {
            return 'Logout';
        }
    }

    render() {
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href="/">Goals Tracker</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/HousewifeHacker/mernTodo">Github</NavLink>
                        </NavItem>
                        <NavItem>
                            {this.renderAuthLinks()}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
