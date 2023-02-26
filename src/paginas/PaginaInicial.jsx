// IMPORTANDO COMPONENTES

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categorias from '../componentes/Categorias';
import Cabecalho from '../componentes/Cabeçalho';
import CardProduto from '../componentes/CardProduto';

export default class PaginaInicial extends Component {
  render() {
    const { buscaInput, produtosResultado,
      acessarProdutosApi, acessarProdutosCategoria,
      categoriaLista, handleChange,
      adicionaCarrinho } = this.props;
    return (
      <section>
        <Cabecalho
          onClick={ () => acessarProdutosApi(buscaInput) }
          onChange={ handleChange }
          value={ buscaInput }
        />
        <Categorias
          onClick={ acessarProdutosCategoria }
          categoriaLista={ categoriaLista }
        />
        {(produtosResultado.length < 1) && (
          <p>
            {' '}
            Nenhum produto foi encontrado
            {' '}
          </p>

        )}
        {
          (!produtosResultado.length < 1) ? (
            produtosResultado.map((product) => (
              <section key={ product.id }>
                <CardProduto
                  btnInfoTest="product-add-to-cart"
                  IdInfoTeste="product"
                  product={ product }
                  adicionaCarrinho={ adicionaCarrinho }
                />
                <Link
                  to={ `/productDetails/${product.id}` }
                  data-testid="product-detail-link"
                >
                  {' '}
                  Detalhes
                  {' '}
                </Link>
              </section>
            ))

          ) : (
            <p
              data-testid="home-initial-message"
            >
              {' '}
              Digite algum termo de pesquisa ou escolha uma categoria.
              {' '}
            </p>
          )
        }
      </section>
    );
  }
}

PaginaInicial.propTypes = {
  handleChange: PropTypes.func,
  buscaInput: PropTypes.func,
  acessarProdutosApi: PropTypes.func,
  acessarProdutosCategoria: PropTypes.func,
  produtosResultado: PropTypes.objectOf,
  adicionaCarrinho: PropTypes.func,
  categoriaLista: PropTypes.arrayOf,
}.isRequired;
