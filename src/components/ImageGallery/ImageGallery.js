import { fetchImages } from 'components/Api/Api';
import { Btn } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './imageGallery.module.css';

import { GoX } from 'react-icons/go';

export class ImageGallery extends Component {
  state = {
    inputSearch: '',
    error: null,
    status: 'idle',
    images: [],
    pageNr: 1,
    showModal: false,
    imgSrc: '',
    imgAlt: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.inputSearch;
    const currentSearch = this.props.inputSearch;
    // console.log(this.state);

    if (prevSearch !== currentSearch) {
      this.setState({
        status: 'pending',
        inputSearch: currentSearch,
      });
      fetchImages(currentSearch, 1)
        .then(images => this.setState({ images, status: 'resoloved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onClickMore = async () => {
    const { inputSearch, pageNr, images } = this.state;
    const response = await fetchImages(inputSearch, pageNr + 1);
    this.setState({
      images: [...images, ...response],
      pageNr: pageNr + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    // console.log(e.target.alt);
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

  render() {
    const { images, error, status, showModal, imgSrc, imgAlt } = this.state;

    if (status === 'rejected') {
      return <p>{error}</p>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resoloved') {
      return (
        <div className={css.wrapper}>
          <ul className={css.ImageGallery}>
            {images.map((image, index) => (
              <ImageGalleryItem
                image={image}
                key={index}
                onClick={this.onOpenModal}
              />
            ))}
          </ul>
          {images.length > 0 ? (
            <Btn onClick={this.onClickMore} />
          ) : (
            <p style={{ textAlign: 'center' }}>No images found</p>
          )}
          {showModal && (
            <div>
              <Modal onClose={this.toggleModal}>
                <button
                  className={css.closeBtn}
                  type="button"
                  onClick={this.onCloseModal}
                >
                  <GoX viewBox="-1 0 14 14"></GoX>
                </button>
                <img className={css.modal__img} src={imgSrc} alt={imgAlt} />
              </Modal>
            </div>
          )}
        </div>
      );
    }
  }
}
