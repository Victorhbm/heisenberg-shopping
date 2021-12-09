import React from 'react';
import CartButton from './CartButton';

export default class Header extends React.Component {
  render() {
    const { cartQuantity } = this.props;
    return (
      <header>
        <div className="header-content">
          <h1>Heisenberg Shopping</h1>
          <CartButton cartQuantity={cartQuantity} />
        </div>
      </header>
    );
  }
}
