import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchEntry: '',
  };

  handelChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchEntry: value });
  };

  render() {
    const { searchEntry } = this.state;
    const minimumCharacters = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchEntry">
            <input
              data-testid="search-artist-input"
              id="searchEntry"
              type="text"
              onChange={ this.handelChange }
              value={ searchEntry }
            />
          </label>
          <button
            type="button"
            disabled={ searchEntry.length < minimumCharacters }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
