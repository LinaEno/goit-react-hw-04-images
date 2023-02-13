import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '32422672-c7645cbe09fcb5cc079592851';

export default async function fetchImages(value, page) {
  const params = {
    page,
    q: value,
    per_page: 12,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const { data } = await axios.get('/', { params });
  const images = data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
    id,
    webformatURL,
    tags,
    largeImageURL,
  }));
  const totalImages = data.totalHits;
  return { totalImages, images };
}
