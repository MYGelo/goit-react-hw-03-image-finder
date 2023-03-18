import { fetchImages } from 'components/Api/Api';
import { Btn } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './imageGallery.module.css';
// import { Button } from './Button/Button';
// export const ImageGallery = ({ title, children }) => {
//   return <ul className={css.ImageGallery}>{children}</ul>;
// };

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

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.inputSearch;
    const currentSearch = this.props.inputSearch;

    if (prevSearch !== currentSearch) {
      this.setState({ status: 'pending', inputSearch: currentSearch });
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

  render() {
    const { images, error, status, showModal, imgSrc, imgAlt } = this.state;

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
          <p>No images found</p>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button
              className={css.closeBtn}
              type="button"
              onClick={this.onCloseModal}
            >
              Close
            </button>
            <img className={css.modal__img} src={imgSrc} alt={imgAlt} />
            <p className={css.modal__text}>{imgAlt}</p>
          </Modal>
        )}
      </div>
    );
  }
}
