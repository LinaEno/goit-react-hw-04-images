import React from 'react';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.resetForm();
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };
  resetForm = () => {
    this.setState({ value: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchFormButton">
            <BsSearch />
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            className="SearchFormInput"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string,
};

export default SearchBar;
