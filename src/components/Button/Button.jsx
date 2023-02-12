import React from 'react';

const Button = ({ onClickLoadMore }) => {
  return (
    <button type="button" onClick={onClickLoadMore} className="Button">
      Load more
    </button>
  );
};

export default Button;
