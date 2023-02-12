import { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        onClick={toggleModal}
        className="ImageGalleryItemImage"
        src={webformatURL}
        alt={tags}
      />
      {showModal ? (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      ) : null}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.node,
  tags: PropTypes.string,
  showModal: PropTypes.bool,
};
