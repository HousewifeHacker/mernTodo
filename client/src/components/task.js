import React, { Component } from 'react';
import {
    Button,
    ListGroupItem,
} from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends Component {
    render() {
        const {_id, name, index, removeTask} = this.props;
        
        return (
            <Draggable draggableId={_id} index={index}>
                {(provided, snapshot) => ( 
                    // reactstrap isnt my component, so dnd needs dom element
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                    >
                        <ListGroupItem>
                            <Button
                                className="remove-btn mr-1"
                                color="danger"
                                size="sm"
                                onClick={() => removeTask(_id)}
                            >
                                &times;
                            </Button>
                            {name}
                        </ListGroupItem>
                    </div>
                )}
            </Draggable>
        );
    }
}
