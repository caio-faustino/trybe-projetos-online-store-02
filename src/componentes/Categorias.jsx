// IMPORTANDO COMPONENTES

import React from 'react';
import PropTypes from 'prop-types';

export default class Categorias extends React.Component {
  render() {
    const {
      categoriaLista,
      onClick } = this.props;
    return (
      <section>
        <h1>Categorias</h1>
        { categoriaLista.map((produto) => (
          <button
            onClick={ onClick }
            data-testid="category"
            key={ produto.id }
            name={ produto.id }
            type="button"
          >
            {' '}
            { produto.name }
            {' '}
          </button>)) }
      </section>
    );
  }
}
Categorias.propTypes = {
  acessaListaCategorias: PropTypes.func, categoriaLista: PropTypes.arrayOf }.isRequired;
