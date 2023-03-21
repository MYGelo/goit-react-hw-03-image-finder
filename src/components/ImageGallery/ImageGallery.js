import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './imageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => (
  <ul className={css.ImageGallery}>
    {images.map((image, index) => (
      <ImageGalleryItem
        onClick={onClick}
        image={image}
        key={index}
      ></ImageGalleryItem>
    ))}
  </ul>
);
