import React, { Component } from 'react';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  handleChange = (key, { value }) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { getProducts } = this.props;
    const { search } = this.state;
    getProducts(search, 'query');
    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;

    return (
      <div className="search-container">
        <form onSubmit={(e) => this.handleSubmit(e)} className="search-form">
          <input
            type="text"
            value={search}
            onChange={({ target }) => this.handleChange('search', target)}
            className="search-input"
            placeholder="Buscar"
          />
          <button type="submit" className="search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-search button-icon search-icon"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
    );
  }
}
