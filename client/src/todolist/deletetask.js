import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class DeleteTask extends React.Component {
    state = {
        isOpen: false
    };

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }
  
  render() {
    const { handleDelete } = this.props;
    return (
      <React.Fragment>
        <Button
          color="danger"
          onClick={this.toggleModal}
          title="Delete"
          className="remove-btn ml-1 float-right"
          size="sm"
        >
          <FontAwesomeIcon icon="trash" />
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader className="text-center" toggle={this.toggleModal}>
            <div className="icon-box">
              <FontAwesomeIcon icon="trash" />
            </div>
            <h2>Are you sure?</h2>
          </ModalHeader>
          <ModalBody>Do you really want to delete this? This process cannot be undone.</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>{' '}
            <Button color="danger" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  } 
}
