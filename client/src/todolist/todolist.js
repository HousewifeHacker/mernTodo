import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    ListGroup,
} from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Task from './task';

export default class ToDoList extends Component {
    state = {
        listName: '',
        tasks: [],
        listId: null
    };

    componentDidMount() {
        const { listId } = this.props.match.params;
        axios.get(`/api/lists/${listId}`)
            .then(res => this.setState({
                listName: res.data.name,
                tasks: res.data.tasks,
                listId: listId
            }));
    }

    addItem = () => {
        const name = prompt('Enter task');
        if (name) {
            axios.post('/api/tasks', {
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
        axios.delete(`/api/tasks/${id}`)
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
        axios.put(`/api/lists/${this.state.listId}`, {
            tasks: tasksIds 
        });
    }

    render() {
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
                    <h1>{this.state.listName}</h1>
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
