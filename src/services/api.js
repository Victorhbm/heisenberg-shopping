export async function getCategories() {
  const endPoint = fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = (await endPoint).json();

  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  const response = fetch(endPoint);
  const data = (await response).json();

  return data;
}

export async function getProductsFromQuery(query) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const response = fetch(endPoint);
  const data = (await response).json();
  const { results } = await data;
  return results;
}

export async function getProductsFromCategory(category) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${category}`;

  const response = fetch(endPoint);
  const data = (await response).json();
  const { results } = await data;
  return results;
}

export async function getProductInfo(id) {
  const endPoint = `https://api.mercadolibre.com/items/${id}`;

  const response = fetch(endPoint)
    .then((data) => data.json())
    .catch(() => new Error('You must provide an url'));
  return response;
}