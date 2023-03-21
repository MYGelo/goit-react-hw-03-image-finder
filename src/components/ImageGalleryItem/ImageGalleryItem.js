import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onClick }) => (
  <>
    <li onClick={onClick} className={css.ImageGalleryItem} id={image.id}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        name={image.largeImageURL}
        className={css.ImageGalleryItem__image}
      ></img>
    </li>
  </>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
