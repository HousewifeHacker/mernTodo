import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    Container,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import { AuthContext } from '../utils/AuthContext';

export default class ListMenu extends Component {
    state = { lists: [] };

    componentDidMount() {
        const user = this.context.user;
        axios.get(`/api/users/${user}/lists`)
            .then(res => this.setState({lists: res.data}));
    }

    addList = () => {
        const user = this.context.user;
        const name = prompt('Enter project name');
        if (name) {
            axios.post('/api/lists', {
                user: user,
                name: name,
            }).then(res => {
                this.setState(state => ({
                    lists: [...state.lists, res.data]
                }));
            });
        }
    }

    render() {
        const { lists } = this.state;
        const listItems = lists.map( (list, index) => {
            return (
                <ListGroupItem tag={Link} to={`/lists/${list._id}`} key={index}>
                    {list.name}
                </ListGroupItem>
            );
        });
        return (
            <Container>
                <ListGroup>
                    {listItems}
                </ListGroup>
                <Button className="mt-2" onClick={this.addList}>
                    Add Project
                </Button>
            </Container>
        );
    }
}

ListMenu.contextType = AuthContext;
