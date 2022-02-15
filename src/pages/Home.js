import React, { Component } from 'react';
import Categorias from '../components/Categorias';
import Header from '../components/Header';
import Products from '../components/Products';
import Search from '../components/Search';
import { getProductsFromCategory, getProductsFromQuery } from '../services/api';
import { getItemsFromStorage } from '../services/storage';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      cartItems: [],
      quantity: 0,
    };

    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    const cartItems = getItemsFromStorage();
    this.setState({ cartItems });
    if (cartItems) {
      this.setState({ quantity: cartItems.length })
    }
  };

  async getProducts(search, method) {
    let products;
    if (method === 'query') {
      products = await getProductsFromQuery(search);
    }
    if (method === 'category') {
      products = await getProductsFromCategory(search);
    }

    this.setState({
      products,
    });
  }

  render() {
    const { products, quantity } = this.state;

    return (
      <div>
        <Header cartQuantity={quantity} />
        <Search getProducts={this.getProducts} />
        <main>
          <Categorias getProducts={this.getProducts} />
          <Products products={products} getCartItems={this.getCartItems} />
        </main>
      </div>
    );
  }
}