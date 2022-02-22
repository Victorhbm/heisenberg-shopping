import React, { Component } from 'react';
import Categorias from '../components/Categorias';
import Header from '../components/Header';
import Loading from '../components/Loading';
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
      loading: false,
    };

    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    this.getProducts("MLB1000", 'category');
  }

  getCartItems = () => {
    const cartItems = getItemsFromStorage();
    this.setState({ cartItems });
    if (cartItems) {
      this.setState({ quantity: cartItems.length })
    }
  };

  async getProducts(search, method) {
    this.setState({ loading: true });

    let products;
    if (method === 'query') {
      products = await getProductsFromQuery(search);
    }
    if (method === 'category') {
      products = await getProductsFromCategory(search);
    }

    this.setState({
      products,
      loading: false,
    });
  }

  render() {
    const { products, quantity, loading } = this.state;

    return (
      <div>
        <Header cartQuantity={quantity} />
        <main className="cat-prod-container">
          <Categorias getProducts={this.getProducts} />
          <div className="products-search-container">
            <Search getProducts={this.getProducts} />
            {loading ? <Loading /> : (
              <Products products={products} getCartItems={this.getCartItems} />
            )}
          </div>
        </main>
      </div>
    );
  }
}
