const key = 'cart';

export function addProductInCart(product) {
  let theCart = [];

  if (JSON.parse(localStorage.getItem(key))) {
    theCart = JSON.parse(localStorage.getItem(key));
  }

  if (theCart.length > 0) {
    const getSameItem = theCart.find((item) => item.id === product.id)
    if (getSameItem) {
      if (getSameItem.qtd >= getSameItem.available_quantity) {
        return null;
      }
      const indexSameItem = theCart.indexOf(getSameItem);
      theCart[indexSameItem].qtd += 1;
      theCart[indexSameItem].finalPrice = theCart[indexSameItem].qtd * theCart[indexSameItem].price;
    } else {
      theCart.push(product);
    }
  } else {
    theCart.push(product);
  }

  localStorage.setItem(key, JSON.stringify(theCart));
}

export function removeProduct(product) {
  const theCart = JSON.parse(localStorage.getItem(key));
  const cartFilter = theCart.filter((item) => item.id !== product.id);
  localStorage.setItem(key, JSON.stringify(cartFilter));
}

export function getItemsFromStorage() {
  const cart = JSON.parse(localStorage.getItem(key));
  if (cart) {
    return cart;
  } else {
    return [];
  }
}

export function changeQuantity(product, fator, callback) {
  const key = 'cart';
  const theCart = JSON.parse(localStorage.getItem(key));
  const getSameItem = theCart.find((item) => item.id === product.id);
  const indexSameItem = theCart.indexOf(getSameItem);

  if (getSameItem.qtd !== 1 && fator === "decrease") {
    theCart[indexSameItem].qtd -= 1;
    theCart[indexSameItem].finalPrice =
      theCart[indexSameItem].qtd * theCart[indexSameItem].price;

    localStorage.setItem(key, JSON.stringify(theCart));
    callback();
  } else if (fator === "increase") {
    addProductInCart(product);
    callback();
  }
};