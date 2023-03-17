import css from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
import axios from 'axios';

export class ImageGalleryItem extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const response = await axios.get('/search?query=react');
    this.setState({ images: response.data.hits });
  }

  render() {
    const { images } = this.state;

    return (
      <li className={css.ImageGalleryItem}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <img
            className={css.ImageGalleryItem__image}
            src={webformatURL}
            alt={id}
          />
        ))}
      </li>
    );
  }
}

// (<span> {largeImageURL}</span>)

// export const fetchImages = async (inputValue, pageNr) => {
//   const options = {
//     headers: {
//       key: '33413871-83de45d798729799c18dcdbf3',
//     },
//   };
//   const url = `https://pixabay.com/api/?q=${inputValue}t&page=1&key=${options.headers.key}&image_type=photo&orientation=horizontal&per_page=${pageNr}`;

//   return await axios
//     .get(url)
//     .then(async r => {
//       console.log(pageNr);
//       console.log(r);
//       return await r;
//     })
//     .catch(error => {
//       if (error.r) {
//         console.log(error.r.data);
//         console.log(error.r.status);
//         console.log(error.r.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log(error.message);
//       }
//     });
// };
