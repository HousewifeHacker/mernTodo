import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

export default class ListMenu extends Component {
    state = { lists: [], user: "5c8d916bfd6c30d0ad64efda" };

    componentDidMount() {
        axios.get(`api/lists?user=${this.state.user}`)
            .then(res => this.setState({lists: res.data}));
    }

    render() {
        const { lists } = this.state;
        const listItems = lists.map( (list, index) => {
            return (
                    <ListGroupItem tag={Link} to={`/lists/${list._id}`} key="{index}">
                    {list.name}
                </ListGroupItem>
            );
        });
        return (
            <ListGroup>
                {listItems}
            </ListGroup>
        );
    }
}
