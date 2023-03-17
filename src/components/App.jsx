import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const API =
  'https://pixabay.com/api/?key=33413871-83de45d798729799c18dcdbf3?q=cat&image_type=photo&orientation=horizontal&per_page=12';

export class App extends Component {
  state = {
    id: '',
    webformatURL: '',
    largeImageURL: '',
  };

  render() {
    return (
      <>
        <ImageGallery>
          <ImageGalleryItem></ImageGalleryItem>
        </ImageGallery>
      </>
    );
  }
}
