// IMPORTANDO COMPONENTES

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import CardProduto from '../componentes/CardProduto';

export default class DetalhesProduto extends Component {
  state = { informacao: {} };

  componentDidMount() {
    this.acessaInformacao();
  }

  acessaInformacao = async () => {
    const { match: { params: { id } } } = this.props;
    const saida = await getProductById(id);
    this.setState({ informacao: saida });
  };

  render() {
    const { history, adicionaCarrinho } = this.props;
    const { informacao } = this.state;
    return (
      <>
        <CardProduto
          product={ informacao }
          adicionaCarrinho={ adicionaCarrinho }
          btnInfoTest="product-detail-add-to-cart"
          nomeInfoTeste="product-detail-name"
          precoInfoTeste="product-detail-price"
          imgInfoTeste="product-detail-image"
        />
        <button
          onClick={ () => history.push('/shopping') }
          data-testid="shopping-cart-button"
          type="button"
        >
          Para Carrinho
        </button>
      </>
    );
  }
}

DetalhesProduto.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
}.isRequired;
