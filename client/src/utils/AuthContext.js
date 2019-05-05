import React from 'react';
import axios from 'axios';

import { getFromStorage, setInStorage } from './storage';

const AuthContext = React.createContext({
    authToken: null,
});

class AuthProvider extends React.Component {
    // TODO
    // probably want user_id too
    state = {
        authToken: null,
    };
    login = (authToken) => {
        this.setState({
            authToken: authToken,
        });
    }
    logout = () => {
        const { authToken } = this.state;
        if (authToken) {
            axios.delete(`api/sessions/${authToken}`)
                .then(res => {
                    setInStorage('jessies_mern_todo', {});
                    this.setState({ authToken: null });
               });
        }

    }

    verifyToken = (token) => {
        axios.get(`api/sessions/${token}`)
            .then(res => {
                const { data } = res;
                if (!data.success) {
                    this.logout();
                } else {
                    this.login(token);
                }
            });
    }

    renderLoading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

    getAuthToken() {
        const authObj = getFromStorage('jessies_mern_todo');
        if (authObj && authObj.token) {
            return authObj.token;
        }
    }

    renderChildren() {
        /*
          1. If we have an auth token in storage, verify that its the same
             as the one we already have.  If its different, re-verify the
             token.
          2. If there is no token, just render.
        */
        const authToken = this.getAuthToken();
        if (authToken && authToken !== this.state.authToken) {
            this.verifyToken(authToken); 
            return this.renderLoading();
        }
        return this.props.children;
    }

    render() {
        return(
            <AuthContext.Provider value={{
                authToken: this.state.authToken,
                verifyToken: this.verifyToken,
                logout: this.logout,
                login: this.login
            }}>
                {this.renderChildren()}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthProvider};
