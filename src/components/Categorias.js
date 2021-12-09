import React, { Component } from 'react'
import { getCategories } from '../services/api';

export default class Categorias extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.renderCategories();
  }

  renderCategories = async () => {
    const categorias = await getCategories();
    this.setState({
      categories: categorias,
    });
  }

  handleClick = (id) => {
    const { getProducts } = this.props;
    getProducts(id, 'category')
  }

  render() {
    const { categories } = this.state;

    return (
      <aside>
        {categories.map(({id, name}) => (
          <button
            key={ id }
            id={ id }
            type="button"
            onClick={ () => this.handleClick(id) }
          >
            { name }
          </button>
        ))}
      </aside>
    )
  }
}
