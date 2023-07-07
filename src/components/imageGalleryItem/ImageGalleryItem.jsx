import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';

import { GalleryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(prevShownModal => !prevShownModal);
  };

  return (
    <GalleryItem>
      <Image onClick={onModal} src={item.webformatURL} alt="img" />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
