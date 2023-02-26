export async function getProductById(PRODUCT_ID) {
  const apiMLB = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const retorno = await fetch(apiMLB);
  const saida = await retorno.json();
  return saida;
}

export async function getProductsFromCategoryAndQuery(idCategoria, variavel) {
  const listaCategoriaApi = `https://api.mercadolibre.com/sites/MLB/search?category=${idCategoria}&q=${variavel}`;
  const retorno = await fetch(listaCategoriaApi);
  const saida = await retorno.json();
  return saida;
}

export async function getCategories() {
  const apiMLB = 'https://api.mercadolibre.com/sites/MLB/categories';
  const retorno = await fetch(apiMLB);
  const saida = await retorno.json();
  return saida;
}
