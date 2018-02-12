import {Modal} from 'react-bootstrap'
import Button from 'react-bootstrap'
import React, { Component } from 'react';
import {connect} from "react-redux";
import Dialog from "../../utils/dialog.js"

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.open}>
          Je participe
        </a>
        <Modal animation={false} show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Merci d avoir confirmé ta participation.</h4>
            <p>Tu seras contacté par l equipe Oroks qui te donnera tous les détails necesaires.</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
