import React, { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.toggleModal}
          className="ImageGalleryItemImage"
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
        {showModal ? (
          <Modal
            largeImageURL={this.props.largeImageURL}
            tags={this.props.tags}
            onClose={this.toggleModal}
          />
        ) : null}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.node,
  tags: PropTypes.node,
  showModal: PropTypes.bool,
};

export default ImageGalleryItem;
