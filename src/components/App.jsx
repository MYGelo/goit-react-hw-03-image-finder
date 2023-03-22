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
    page: 1,
    showModal: false,
    imgSrc: '',
    imgAlt: '',
    showBtnLoadMore: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.state.images);
    if (
      prevState.inputSearch !== this.state.inputSearch ||
      prevState.page !== this.state.page
    ) {
      fetchImages(this.state.inputSearch, this.state.page)
        .then(({ images, totalHits }) => {
          if (this.state.page === 1) {
            console.log(`this.state.page === 1`);
            this.setState({
              images: images,
              isLoading: false,
              showBtnLoadMore: this.state.page < Math.ceil(totalHits / 12),
            });
          }
          if (this.state.page > 1) {
            console.log('this.state.page > 1');
            this.setState({
              images: [...prevState.images, ...images],
              isLoading: false,
              showBtnLoadMore: this.state.page < Math.ceil(totalHits / 12),
            });
          }
        })
        .catch(error => this.setState({ error }));
    }
    console.log(this.state.page, this.state.images);
  }

  onClickMore = async () => {
    // this.setState(prevState => ({ page: (prevState.page += 1) }));
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSearchSubmit = currentSearch => {
    this.setState({ inputSearch: currentSearch });
    this.setState({ images: [], page: 1 });
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
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

  render() {
    const { images, isLoading, showModal, imgSrc, imgAlt, showBtnLoadMore } =
      this.state;

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
              {showBtnLoadMore ? <Btn onClick={this.onClickMore} /> : null}
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
