import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const handleChange = e => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchFormButton">
          <BsSearch />
        </button>
        <input
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          className="SearchFormInput"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
};
