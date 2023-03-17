import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';

const options = {
  headers: {
    key: '33413871-83de45d798729799c18dcdbf3',
    searchInputValue: 'nude',
    page: '1',
    perPage: '12',
  },
};

axios.defaults.baseURL = `https://pixabay.com/api/?q=${options.headers.searchInputValue}&page=${options.headers.page}&key=${options.headers.key}&image_type=photo&orientation=horizontal&per_page=${options.headers.perPage}`;

export class App extends Component {
  state = {
    images: [],
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar />

        <ImageGallery>
          <ImageGalleryItem images={this.state.images}></ImageGalleryItem>
        </ImageGallery>
        <Modal images={this.state.images}></Modal>
        <Button></Button>
      </div>
    );
  }
}
