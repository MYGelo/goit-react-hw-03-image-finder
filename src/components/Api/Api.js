import axios from 'axios';

const key = '33413871-83de45d798729799c18dcdbf3';

export const fetchImages = async (inputValue, page) => {
  const url = `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await axios.get(url);

    const images = response.data.hits.map(hit => {
      return {
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
      };
    });
    const totalHits = response.data.totalHits;

    if (response.status === 200) {
      return { images, totalHits };
    }
  } catch (error) {
    return Promise.reject(new Error('Sorry something go wrong ;('));
  }
};
