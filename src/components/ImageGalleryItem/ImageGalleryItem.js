import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={css.gallery__item}>
      <img src={src} alt={alt} />
    </li>
  );
};
