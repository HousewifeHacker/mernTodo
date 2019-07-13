import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withStyles from 'react-jss';

class DeleteTask extends React.Component {
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
        <Modal className={this.props.classes.deleteModal} isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader className="text-center" toggle={this.toggleModal}>
            <div className="icon-box">
              <FontAwesomeIcon icon="trash" className="red-circle"/>
            </div>
            Are you sure?
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

const styles = {
    deleteModal: {
        '& .modal-content *': {
            border: 'none',
        },
        // created by reactstrap ModalHeader
        '& .modal-title, & .modal-footer': {
            margin: '0 auto',
        },
        '& .modal-header': {
            '& h5': {
                fontSize: '1.8rem',
            },
            '& .close': {
                position: 'absolute',
		            top: '10px',
		            right: '14px',
	          },
            '& .icon-box': {
                margin: '0 auto',
                padding: {
                    bottom: '20px',
                },
            },
        },
        '& .red-circle': {
            width: '60px',
            height: '60px',
            textAlign: 'center',
            lineHeight: '60px',
            verticalAlign: 'middle',
            padding: '8px',
            fontSize: '60px',
            color: 'red',
            backgroundColor: 'white',
            border: {
                style: 'solid',
                width: '3px',
                color: 'red',
                radius: '50%',
            },
        },
    },
};

export default withStyles(styles)(DeleteTask);
