import axios from 'axios';

async function fetchImg(inputData, page) {
  const searchParams = new URLSearchParams({
    key: '36015581-346d0b697f8b5461911613245',
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}

export default fetchImg;
