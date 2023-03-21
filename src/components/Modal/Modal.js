import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    // console.log(event.key);
    if (event.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdrop}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
