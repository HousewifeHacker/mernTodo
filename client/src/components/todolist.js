import React, { Component } from 'react';
import {
    Button,
    Container,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import uuid from 'uuid';

export default class ToDoList extends Component {
    state = {
        tasks: [
            { id: uuid(), name: 'do it' },
            { id: uuid(), name: 'yeah' },
        ]
    }

    renderTask = (task) => {
        return (
            <ListGroupItem key={task.id}>
                {task.name}
            </ListGroupItem>
        );
    }

    addItem = () => {
        const name = prompt('Enter task');
        if (name) {
            this.setState(state => ({
                tasks: [...state.tasks, { id: uuid(), name }]
            }));
        }
    }

    render() {
        const { tasks } = this.state;
        return(
            <Container>
                <h1>ToDo</h1>
                <ListGroup className="col-sm-3">
                    {tasks.map(this.renderTask)}
                </ListGroup>
                <Button className="mt-2" onClick={this.addItem}>
                    Add Task
                </Button>
            </Container>
        );
    }
}
