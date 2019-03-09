import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TopNav from './components/topnav';
import ToDoList from './components/todolist';
import SignUpForm from './components/signupform';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopNav />
                <Switch>
                    <Route exact path="/" component={ToDoList} />
                    <Route path="/signup" component={SignUpForm} />
                </Switch>
            </div>
        );
    }
}

export default App;
