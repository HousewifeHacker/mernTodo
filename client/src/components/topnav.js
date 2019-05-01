import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import { AuthConsumer } from '../utils/AuthContext';

class TopNav extends Component {
    renderAuthLinks = () => {
        return(
            <AuthConsumer>
                {({ authToken, logout, login }) => (
                    <div>
                        {authToken ? (
                            <Button onClick={logout}>Logout</Button>
                        ) : (
                            <React.Fragment>
                                <Button
                                    outline
                                    color="link"
                                    onClick={(e) => login('dummy_token')}>
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

export default withRouter(TopNav);
