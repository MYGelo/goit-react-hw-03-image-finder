import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { fetchImages } from 'components/Api/Api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Btn } from './Button/Button';

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
      imgAlt: e.target.alt,
    });
  };

  onCloseModal = e => {
    e.stopPropagation();
    this.setState({
      showModal: false,
      imgSrc: '',
      imgAlt: '',
    });
  };
  onClick = e => {
    console.log('onClick');
  };

  render() {
    const { images, isLoading, showModal, imgSrc, imgAlt } = this.state;
    console.log('showModal:', showModal);

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
              <ImageGallery images={images} onClick={this.onOpenModal} />
              <button onClick={this.onOpenModal}>1111111</button>

              {images.length > 11 ? <Btn onClick={this.onClickMore} /> : null}
            </React.Fragment>
          )}

          {showModal ? (
            <Modal>
              <button type="button" onClick={this.onCloseModal}>
                123
              </button>
              <img onClick={this.onCloseModal} src={imgSrc} alt={imgAlt} />
            </Modal>
          ) : null}
        </div>
      </>
    );
  }
}
