import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import TopNav from './topnav/topnav';
import ToDoList from './todolist/todolist';
import SignUpForm from './components/signupform';
import SignInForm from './components/signinform';
import ListsMenu from './components/listsmenu';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthProvider>
                    <TopNav />
                    <Switch>
                        <ProtectedRoute exact path="/" component={ListsMenu} />
                        <ProtectedRoute path="/lists/:listId" component={ToDoList} />
                        <Route exact path="/signup" component={SignUpForm} />
                        <Route exact path="/signin" component={SignInForm} />
                    </Switch>
                </AuthProvider>
            </div>
        );
    }
}

export default App;
