import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onClick }) => (
  <button type="button" onClick={e => onClick}>
    <li className={css.ImageGalleryItem} id={image.id}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        name={image.largeImageURL}
        className={css.ImageGalleryItem__image}
      ></img>
    </li>
  </button>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onclick: PropTypes.func.isRequired,
};
