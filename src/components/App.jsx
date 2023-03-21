import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from 'components/Api/Api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Btn } from './Button/Button';

import { FcCancel } from 'react-icons/fc';

export class App extends Component {
  state = {
    inputSearch: '',
    error: null,
    isLoading: false,
    images: [],
    pageNr: 1,
    showModal: false,
    imgSrc: '',
    imgAlt: '',
  };
  async componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.inputSearch;
    const currentSearch = this.state.inputSearch;

    if (prevSearch !== currentSearch) {
      this.setState({
        inputSearch: currentSearch,
      });
      fetchImages(currentSearch, 1)
        .then(images => this.setState({ images, isLoading: false }))
        .catch(error => this.setState({ error }));
    }
  }
  onClickMore = async () => {
    const { inputSearch, pageNr, images } = this.state;
    const response = await fetchImages(inputSearch, pageNr + 1);
    this.setState({
      images: [...images, ...response],
      PageNr: pageNr + 1,
    });
  };

  handleSearchSubmit = inputSearch => {
    this.setState({ inputSearch });
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    this.setState({
      showModal: true,
      imgSrc: e.target.name,
      // imgAlt: e.target.alt,
    });
  };

  onCloseModal = e => {
    this.setState({
      showModal: false,
    });
  };
  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.onModalClose();
    }
  };

  render() {
    const { images, isLoading, showModal, imgSrc, imgAlt } = this.state;

    return (
      <>
        <div
          style={{
            height: '100vh',
            fontSize: 40,
            color: '#010101',
          }}
        >
          <Searchbar onSubmit={this.handleSearchSubmit} />

          {isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <ImageGallery
                images={images}
                showModal={showModal}
                onClick={this.onOpenModal}
              />
              {images.length > 11 ? <Btn onClick={this.onClickMore} /> : null}
            </React.Fragment>
          )}

          {showModal ? (
            <Modal onCloseModal={this.onCloseModal}>
              <button
                style={{
                  position: 'relative',
                  left: '100%',

                  background: 'transparent',
                  border: 'transparent',
                }}
                type="button"
                onClick={this.onCloseModal}
              >
                <FcCancel />
              </button>
              <img
                style={{
                  display: 'flex',
                  position: 'relative',
                  width: '100%',
                  top: '-10px',
                }}
                src={imgSrc}
                alt={imgAlt}
              ></img>
            </Modal>
          ) : null}
        </div>
      </>
    );
  }
}

// onCloseModal = () => {
//   e.stopPropagation();
//   this.setState({
//     showModal: false,
//     imgSrc: '',
//     imgAlt: '',
//   });
//   console.log('onCloseModal');
// };
