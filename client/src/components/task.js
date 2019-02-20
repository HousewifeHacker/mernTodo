import React, { Component } from 'react';
import {
    Button,
    ListGroupItem,
} from 'reactstrap';

export default class Task extends Component {
    render() {
        const {_id, name, removeTask} = this.props;
        
        return (
            <ListGroupItem>
                <Button
                    className="remove-btn mr-1"
                    color="danger"
                    size="sm"
                    onClick={() => removeTask(_id)}>
                    &times;
                </Button>
                {name}
            </ListGroupItem>
        );
    }
}
