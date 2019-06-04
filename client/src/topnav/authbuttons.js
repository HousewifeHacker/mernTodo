import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
} from 'reactstrap';

import { AuthContext } from '../utils/AuthContext';

const AuthButtons = () => {
    const { authToken, logout } = useContext(AuthContext);
    if (authToken) {
        return <Button outline color="primary" onClick={logout}>Logout</Button>
    }
    return (
        <React.Fragment>
            <Button
                color="primary"
                tag={Link}
                to="/signin">
                Sign In
            </Button>
            {' '}
            <Button
                color="primary"
                tag={Link}
                to="/signup">
                Sign Up
            </Button>
        </React.Fragment>
    )
};

export default AuthButtons;
