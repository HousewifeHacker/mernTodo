import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import withAuth from './utils/withAuth';
import { AuthProvider } from './utils/AuthContext';
import TopNav from './components/topnav';
import ToDoList from './components/todolist';
import SignUpForm from './components/signupform';
import SignInForm from './components/signinform';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthProvider>
                    <TopNav />
                    <Switch>
                        <Route exact path="/" component={withAuth(ToDoList)} />
                        <Route path="/signup" component={SignUpForm} />
                        <Route path="/signin" component={SignInForm} />
                    </Switch>
                </AuthProvider>
            </div>
        );
    }
}

export default App;
