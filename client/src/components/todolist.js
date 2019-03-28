import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    Container,
    ListGroup,
} from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Task from './task';

export default class ToDoList extends Component {
    state = {tasks: [], listId: "5c6d5b34a882b47c33563fa1"};

    componentDidMount() {
        axios.get(`api/lists/${this.state.listId}`)
            .then(res => this.setState({tasks: res.data.tasks}));
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

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) { return }
        if (destination.index === source.index) { return }

        const tasks = this.state.tasks.slice();
        const [removed] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, removed);
        this.setState({tasks: tasks});
        const tasksIds = tasks.map( task => { return task._id })

        // tasks order saved as array of ids under List model
        axios.put(`api/lists/${this.state.listId}`, {
            tasks: tasksIds 
        })
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/signin" />
        }
        const { tasks } = this.state;
        const taskElems = tasks.map( (task, index) => {
            return (
                <Task
                    {...task}
                    removeTask={this.removeTask}
                    key={task._id}
                    index={index}
                />
            );
        });

        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                    <h1>ToDo</h1>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            //  dnd ref needs html element. Divitis
                            <div
                                className="col-sm-3"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <ListGroup>
                                    {taskElems}
                                    {provided.placeholder}
                                </ListGroup>
                            </div>
                        )}
                    </Droppable>
                    <Button className="mt-2" onClick={this.addItem}>
                        Add Task
                    </Button>
                </Container>
            </DragDropContext>
        );
    }
}
