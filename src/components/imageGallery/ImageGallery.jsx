import ImageGalleryItem from 'components/imageGalleryItem';
import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ items }) => {
  return (
    <Gallery>
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ImageGallery;
