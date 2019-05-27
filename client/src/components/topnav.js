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

import { AuthConsumer } from '../utils/AuthContext';

export default class TopNav extends Component {
    renderAuthLinks = () => {
        return(
            <AuthConsumer>
                {({ authToken, logout }) => (
                    <div>
                        {authToken ? (
                            <Button onClick={logout}>Logout</Button>
                        ) : (
                            <React.Fragment>
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
                            </React.Fragment>
                        )}
                    </div>
                )}
            </AuthConsumer>
        );
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
