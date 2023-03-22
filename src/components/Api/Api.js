import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, page) => {
  try {
    const key = '33413871-83de45d798729799c18dcdbf3';

    const response = await axios.get(
      `/?q=${inputValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    );

    const images = response.data.hits.map(hit => {
      return {
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
      };
    });
    const totalHits = response.data.totalHits;
    // console.log('totalHits', totalHits);

    if (response.status === 200) {
      console.log({ images, totalHits });
      return images;
    }
  } catch (error) {
    return Promise.reject(new Error('Sorry something go wrong ;('));
  }
};
