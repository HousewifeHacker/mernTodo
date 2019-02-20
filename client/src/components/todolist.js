import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    ListGroup,
} from 'reactstrap';
import uuid from 'uuid';

import Task from './task';

export default class ToDoList extends Component {
    state = {tasks: [], listId: "5c6d5b34a882b47c33563fa1"};

    componentDidMount() {
        axios.get('api/tasks')
            .then(res => this.setState({tasks: res.data}));
    }

    addItem = () => {
        const name = prompt('Enter task');
        if (name) {
            axios.post('api/tasks', {
                name: name,
                list: this.state.listId
            })
                .then(res => {
                    this.setState(state => ({
                        tasks: [...state.tasks, res.data]
                    }));
                });
        }
    }

    removeTask = (id) => {
        axios.delete(`api/tasks/${id}`)
            .then(res => {
                this.setState(state => ({
                    tasks: state.tasks.filter(task => task._id !== id)
                }));
            });
    }

    render() {
        const { tasks } = this.state;
        const taskElems = tasks.map( task => {
            return (<Task {...task} removeTask={this.removeTask} key={task._id} />);
        });

        return(
            <Container>
                <h1>ToDo</h1>
                <ListGroup className="col-sm-3">
                    {taskElems}
                </ListGroup>
                <Button className="mt-2" onClick={this.addItem}>
                    Add Task
                </Button>
            </Container>
        );
    }
}
