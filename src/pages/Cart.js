import React, { Component } from 'react';
import Header from '../components/Header';
import ReturnButton from '../components/ReturnButton';
import {
  addProductInCart,
  getItemsFromStorage,
  removeProduct,
} from '../services/storage';

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    const cartItems = getItemsFromStorage();
    this.setState({ cartItems });
  };

  increaseQuantity = (item) => {
    addProductInCart(item);
    this.getCartItems();
  };

  decreaseQuantity = (product) => {
    const key = 'cart';
    const theCart = JSON.parse(localStorage.getItem(key));
    const getSameItem = theCart.find((item) => item.id === product.id);
    const indexSameItem = theCart.indexOf(getSameItem);

    if (getSameItem.qtd !== 1) {
      theCart[indexSameItem].qtd -= 1;
      theCart[indexSameItem].finalPrice =
        theCart[indexSameItem].qtd * theCart[indexSameItem].price;

      localStorage.setItem(key, JSON.stringify(theCart));
      this.getCartItems();
    }
  };

  removeItem = (item) => {
    removeProduct(item);
    this.getCartItems();
  };

  render() {
    const { cartItems } = this.state;
    const shouldRender = cartItems.length !== 0;

    return (
      <div>
        <Header cartQuantity={cartItems.length} />
        <section className="page-container">
          <ReturnButton route="/heisenberg-shopping/" />
          {shouldRender ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-content">
                  <span className="cart-item-info-container">
                    <button
                      className="cart-item-remove-btn"
                      type="button"
                      onClick={() => this.removeItem(item)}
                    >
                      X
                    </button>
                    <img
                      className="cart-item-image"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </span>

                  <span className="cart-item-quantity-container">
                    <div className="cart-item-quantity-title-content">
                      <h2>{item.title}</h2>
                    </div>

                    <div className="cart-item-quantity-content">
                      <button
                        className="cart-item-quantity-btn"
                        type="button"
                        onClick={() => this.decreaseQuantity(item)}
                        disabled={item.qtd === 1}
                      >
                        -
                      </button>
                      <p className="cart-item-quantity">{item.qtd}</p>
                      <button
                        className="cart-item-quantity-btn"
                        type="button"
                        onClick={() => this.increaseQuantity(item)}
                        disabled={item.qtd >= item.available_quantity}
                      >
                        +
                      </button>
                      <p>
                        {item.finalPrice.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </div>
                  </span>
                </div>
              ))}
              <span className="final-price-paragraph">
                Valor total da compra:{' '}
                {cartItems.map((item) => item.finalPrice)
                  .reduce((acc, curr) => acc + curr)
                  .toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
              </span>
            </div>
          ) : <p>Seu carrinho está vazio!</p>}
        </section>
      </div>
    );
  }
}
