import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdrop}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
