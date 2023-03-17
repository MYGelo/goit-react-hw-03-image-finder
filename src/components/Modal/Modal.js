import { Component } from 'react';
import css from './Modal.module.css';
import axios from 'axios';

export class Modal extends Component {
  state = {
    images: [],
  };
  async componentDidMount() {
    const response = await axios.get('/search?query=react');
    this.setState({ images: response.data.hits });
  }
  render() {
    const { images } = this.state;

    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          {images.map(({ largeImageURL }) => (
            <img src={largeImageURL} alt="" />
          ))}
        </div>
      </div>
    );
  }
}
