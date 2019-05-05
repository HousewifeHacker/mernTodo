import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import TopNav from './components/topnav';
import ToDoList from './components/todolist';
import SignUpForm from './components/signupform';
import SignInForm from './components/signinform';

const Dummy = () => (
    <div>
        Phoney
    </div>
)

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <AuthProvider>
                        <TopNav />
                        <Switch>
                            <ProtectedRoute exact path="/" component={ToDoList} />
                            <ProtectedRoute path="/dumby" component={Dummy} />
                            <Route path="/signup" component={SignUpForm} />
                            <Route path="/signin" component={SignInForm} />
                        </Switch>
                       <Link to="/dumby">Dumb</Link>
                    </AuthProvider>
                </Router>
            </div>
        );
    }
}

export default App;
