import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => (
  <li className={css.ImageGalleryItem} id={image.id} onClick={onClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItem__image}
    ></img>
  </li>
);
