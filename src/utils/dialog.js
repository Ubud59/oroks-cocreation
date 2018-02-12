import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

class Dialog extends Component{
  constructor({
      visible = false,
      title,
      message,
      children,
      footer,
      onHide
    }){
    super();
    this.contents = message || children;
    this.state = {visible};
    this.footer = footer?<Modal.Footer>{footer}</Modal.Footer>:'';
  }

  close(){
    return this.setState({visible: false});
  }

  open(){
    return this.setState({visible: true});
  }

  render(){
    const {
      title
    } = this.props;
    const {
      visible
    } = this.state;
    const {
      contents,
      footer
    } = this;
    return (
      <Modal show={visible} onHide={this.close.bind(this)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contents}
        </Modal.Body>
        {footer}
      </Modal>
    );
  }
};

Dialog.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default Dialog;
