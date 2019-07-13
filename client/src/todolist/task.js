import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    Button,
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroupItem,
} from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

import DeleteTask from './deletetask';

export default class Task extends Component {
    state = {
        status: this.props.status,
        dropdownOpen: false,
    }
    changeStatus = (e) => {
        const statusInt = parseInt(e.currentTarget.getAttribute('status'));
        if (statusInt in [0,1,2]) {
            this.setState({status: statusInt});
            axios.put(`/api/tasks/${this.props._id}`, {
                status: statusInt
            });
        };
    }
    toggleOpen = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
    renderStatusButton = () => {
        const status = this.state.status;
        return (
            <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleOpen}
                className="float-right">
                <Button
                    color="secondary"
                    size="sm"
                    status={status+1}
                    onClick={this.changeStatus}>
                    {["Start", "Finish", "Done"][status]}
                </Button>
                <DropdownToggle caret color="secondary" size="sm" />
                <DropdownMenu>
                {['New', 'Started', 'Finished'].map((text, idx) => {
                    return (
                        <DropdownItem
                            key={idx}
                            onClick={this.changeStatus}
                            disabled={idx===status}
                            status={idx}>
                            {text}
                        </DropdownItem>
                    )
                })}
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
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
                        <ListGroupItem className="clearfix">
                            {name}
                            <DeleteTask handleDelete={() => removeTask(_id)} />
                            {this.renderStatusButton()}
                        </ListGroupItem>
                    </div>
                )}
            </Draggable>
        );
    }
}

Task.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    removeTask: PropTypes.func.isRequired
};
