import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addProductInCart } from '../services/storage';

export default class Products extends Component {
  addToCart = (product) => {
    const { getCartItems } = this.props;
    const item = {
      ...product,
      qtd: 1,
      finalPrice: product.price,
    };

    addProductInCart(item);
    getCartItems();
  };

  render() {
    const { products } = this.props;

    return (
      <section>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>
                {product.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              {product.shipping.free_shipping && (
                <p className="free-shipping">Frete Grátis</p>
              )}
            </Link>
            <button
              className="add-to-cart-btn"
              type="button"
              onClick={() => this.addToCart(product)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </section>
    );
  }
}
