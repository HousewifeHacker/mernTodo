import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TopNav from './components/topnav';
import ToDoList from './components/todolist';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopNav />
                <ToDoList />
            </div>
        );
    }
}

export default App;
