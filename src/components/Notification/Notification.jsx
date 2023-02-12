import img from '../img/search.png';
import React from 'react';

const Notification = () => {
  return (
    <div>
      <p className="Notification">
        There is nothing here yet. Use the search field
      </p>
      <img className="SearchImg" src={img} alt="search" width="600" />
    </div>
  );
};

export default Notification;
