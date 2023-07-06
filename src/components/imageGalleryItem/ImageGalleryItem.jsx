import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';

import { GalleryItem, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  render() {
    const { item } = this.props;
    const { webformatURL } = item;

    return (
      <GalleryItem>
        <Image onClick={this.onModal} src={webformatURL} alt="img" />
        {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;
