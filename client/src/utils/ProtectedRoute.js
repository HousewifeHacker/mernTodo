import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthConsumer } from './AuthContext';

const authentication = (props, Component, rest) => {
    const {authToken} = props;
    return (
        <Route {...rest}
            render={(props) => {
                if (authToken) {
                    return (
                        <Component {...props}/>
                    );
                }
                return (
                    <Redirect to="/signin" />
                );
            }}
        />
    );
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
        {(props) => {
            return authentication(props, Component, rest); 
        }}
    </AuthConsumer>
);

export default ProtectedRoute;
