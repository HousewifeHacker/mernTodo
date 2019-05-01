import React from 'react';

const AuthContext = React.createContext({
    authToken: null,
});

class AuthProvider extends React.Component {
    state = {
        authToken: null,
    };
    // leave it to sign in form to validate
    login = (authToken) => {
        this.setState({
            authToken: authToken,
        });
    }
    // revoke sessions for current user
    // update state to null values
    // TODO
    logout = () => {
        this.setState({
            authToken: null,
        });
    }
    render() {
        return(
            <AuthContext.Provider value={{
                authToken: this.state.authToken,
                login: this.login,
                logout: this.logout,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthProvider};
