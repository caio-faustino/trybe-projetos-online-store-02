// IMPORTANDO COMPONENTES

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Cabecalho extends Component {
  render() {
    const {
      quandoMudar,
      valor,
      onClick } = this.props;
    return (
      <>
        <label>
          <input
            onChange={ quandoMudar }
            data-testid="query-input"
            name="buscaInput"
            type="text"
            value={ valor }
          />
        </label>
        <button
          onClick={ onClick }
          data-testid="query-button"
          type="button"
        >
          {' '}
          Buscar
          {' '}

        </button>
        <Link to="/shopping" data-testid="shopping-cart-button">
          {' '}
          Meu Carrinho
          {' '}
        </Link>
      </>
    );
  }
}

Cabecalho.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}.isRequired;
