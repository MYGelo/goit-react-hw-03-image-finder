import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, page) => {
  try {
    const key = '33413871-83de45d798729799c18dcdbf3';
    const response = await axios.get(
      `/?q=${inputValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    );

    if (response.status === 200) {
      return response.data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
      });
    }
  } catch (error) {
    return Promise.reject(new Error('Sorry something go wrong ;('));
  }
};
