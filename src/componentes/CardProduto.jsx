// IMPORTANDO COMPONENTES

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardProduto extends Component {
  render() {
    const {
      IdInfoTeste, nomeInfoTeste,
      imgInfoTeste, product,
      precoInfoTeste, btnInfoTest,
      adicionaCarrinho } = this.props;
    return (
      <div data-testid={ IdInfoTeste }>
        <img
          alt={ product.title }
          src={ product.thumbnail }
          data-testid={ imgInfoTeste }
        />
        <p data-testid={ nomeInfoTeste }>{product.title}</p>
        <h3
          data-testid={ precoInfoTeste }
        >
          {product.price}
        </h3>
        { adicionaCarrinho && (
          <button
            onClick={ () => adicionaCarrinho(product.title) }
            type="button"
            data-testid={ btnInfoTest }
          >
            {' '}
            Adicionar ao carrinho
            {' '}
          </button>
        ) }
      </div>
    );
  }
}

CardProduto.propTypes = {
  btnInfoTest: PropTypes.string,
  adicionaCarrinho: PropTypes.func,
  imgInfoTeste: PropTypes.string,
  IdInfoTeste: PropTypes.string,
  product: PropTypes.arrayOf(),
  precoInfoTeste: PropTypes.string,
  nomeInfoTeste: PropTypes.string,
}.isRequired;
