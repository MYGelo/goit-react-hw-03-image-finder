import css from './imageGallery.module.css';

export const ImageGallery = ({ title, children }) => {
  return <ul className={css.ImageGallery}>{children}</ul>;
};
