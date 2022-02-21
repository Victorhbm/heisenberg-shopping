import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ReturnButton from '../components/ReturnButton';
import { getProductInfo } from '../services/api';
import { addProductInCart, getItemsFromStorage } from '../services/storage';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: [],
      picture: '',
      loading: false,
      freeShipping: false,
      cartItems: [],
      quantity: 0,
      attributes: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.getProductData(id);
    this.getCartItems();
  }

  addToCart = (product) => {
    const item = {
      ...product,
      qtd: 1,
      finalPrice: product.price,
    };

    addProductInCart(item);
    this.getCartItems();
  };

  getProductData = async (id) => {
    this.setState({ loading: true });
    const data = await getProductInfo(id);
    this.setState({
      productData: data,
      picture: data.pictures[0].url,
      loading: false,
      freeShipping: data.shipping.free_shipping,
      attributes: data.attributes,
    });
  };

  formatePrice = (valor) => {
    if (valor) {
      const formated = valor.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
      return formated;
    }
  };

  getCartItems = () => {
    const cartItems = getItemsFromStorage();
    this.setState({ cartItems });
    if (cartItems) {
      this.setState({
        quantity: cartItems.length,
      });
    }
  };

  render() {
    const {
      productData: { title, price },
      picture,
      loading,
      freeShipping,
    } = this.state;
    const { productData, quantity, attributes } = this.state;

    return (
      <div>
        <Header cartQuantity={quantity} />
        {loading ? (
          <Loading />
        ) : (
          <div className="page-container">
            <ReturnButton route="/" />
            <div className="product-content">
              <h2>{title}</h2>
              <p className="product-price">{this.formatePrice(price)}</p>
              <div className="product-detail-container">
                <div className="product-image-content">
                  <img className="product-image" src={picture} alt={title} />
                </div>
                <div>
                  <h3>Detalhes do Produto:</h3>
                  <ul>
                    {attributes.slice(0, 12).map((att) => (
                      <li key={att.id} className="product-detail-item">
                        {`${att.name}: ${att.value_name}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {freeShipping && <p className="free-shipping">Frete Grátis</p>}
              <button
                className="add-to-cart-btn"
                type="button"
                onClick={() => this.addToCart(productData)}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
