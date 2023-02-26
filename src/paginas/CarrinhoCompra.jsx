// IMPORTANDO COMPONENTES

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardProduto from '../componentes/CardProduto';

export default class CarrinhoCompra extends Component {
  componentDidMount() {
    this.getLocalStorage('listaProdutos');
  }

  getLocalStorage = (codigo) => {
    const { localStorageHandler } = this.props;
    const result = JSON.parse(localStorage.getItem(codigo));

    localStorageHandler(result);
  };

  render() {
    const {
      aumentaDiminui,
      deletaDoCarrinho,
      listaProdutos } = this.props;
    return (
      <section>
        { (listaProdutos) ? (
          <>
            {listaProdutos.map((product) => (
              <section
                key={ product.id }
              >
                <CardProduto
                  product={ product }
                  btnInfoTest="product-add-to-cart"
                  nomeInfoTeste="shopping-cart-product-name"

                />
                <h2 data-testid="shopping-cart-product-quantity">
                  { product.quantity }
                </h2>
                <button
                  onClick={ () => aumentaDiminui(product.title, '-') }
                  type="button"
                  data-testid="product-decrease-quantity"
                >
                  {' '}
                  add
                  {' '}
                </button>
                <button
                  onClick={ () => aumentaDiminui(product.title, '+') }
                  type="button"
                  data-testid="product-increase-quantity"
                >
                  {' '}
                  rmv
                  {' '}
                </button>
                <button
                  onClick={ () => deletaDoCarrinho(product.title) }
                  data-testid="remove-product"
                  type="button"
                >
                  {' '}
                  del
                  {' '}
                </button>
              </section>
            ))}
          </>)
          : (
            <p
              data-testid="shopping-cart-empty-message"
            >
              {' '}
              Seu carrinho está vazio
              {' '}
            </p>
          )}
      </section>
    );
  }
}

CarrinhoCompra.propTypes = {
  price: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
