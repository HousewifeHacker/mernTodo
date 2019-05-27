import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import TopNav from './components/topnav';
import ToDoList from './components/todolist';
import SignUpForm from './components/signupform';
import SignInForm from './components/signinform';
import ListsMenu from './components/listsmenu';

const Dummy = () => (
    <div>
        Phoney
    </div>
)

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthProvider>
                    <TopNav />
                    <Switch>
                        <ProtectedRoute exact path="/" component={ListsMenu} />
                        <ProtectedRoute path="/lists/:listId" component={ToDoList} />
                        <ProtectedRoute exact path="/dumby" component={Dummy} />
                        <Route exact path="/signup" component={SignUpForm} />
                        <Route exact path="/signin" component={SignInForm} />
                    </Switch>
                    <Link to="/dumby">Dumb</Link>
                </AuthProvider>
            </div>
        );
    }
}

export default App;
