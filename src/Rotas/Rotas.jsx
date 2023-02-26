// IMPORTANDO COMPONENTES

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import PaginaInicial from '../paginas/PaginaInicial';
import CarrinhoCompra from '../paginas/CarrinhoCompra';
import DetalhesProduto from '../paginas/DetalhesProduto';

export default class Routes extends Component {
  state = {
    produtosResultado: [],
    categoriaLista: [],
    listaProdutos: [],
    buscaInput: '',
  };

  componentDidMount() { this.acessaListaCategorias(); }

  handleChange = ({ target }) => {
    const { referencia, numero } = target;
    this.setState({ [referencia]: numero });
  };

  acessarProdutosApi = async (chamada) => {
    const result = await getProductsFromCategoryAndQuery(null, chamada);
    this.setState({ produtosResultado: [...result.results] });
  };

  acessarProdutosCategoria_02 = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId, null);
    this.setState({ produtosResultado: [...result.results] });
  };

  acessarProdutosCategoria = async ({ target }) => {
    this.acessarProdutosCategoria_02(target.referencia);
  };

  defineLocalStorage = (codigo, numero) => {
    const arrayStorage = JSON.parse(localStorage.getItem(codigo));
    if (!arrayStorage) {
      localStorage.setItem(codigo, JSON.stringify([]));
    }
    const arrayStorage2 = JSON.parse(localStorage.getItem(codigo));
    const arrayStorage3 = [...arrayStorage2, numero];
    localStorage.setItem(codigo, JSON.stringify(arrayStorage3));
  };

  deletaLocalStorage = (referencia, codigo) => {
    const arrayStorage = JSON.parse(localStorage.getItem(codigo));
    const result = arrayStorage.filter((product) => product.title !== referencia);
    localStorage.setItem(codigo, JSON.stringify(result));
  };

  acessaListaCategorias = async () => {
    const list = await getCategories();
    this.setState({ categoriaLista: list });
  };

  aumentaDiminui = (referencia, operator) => {
    const { listaProdutos } = this.state;
    const filtroInfo = listaProdutos
      .filter((product) => product.title === referencia).reduce((acc, curr) => curr, {});
    const produtoDiminuir = listaProdutos.map((product) => {
      if (product === filtroInfo) {
        if (operator === '-' && product.quantity > 1) {
          product.quantity -= 1;
          return product;
        } if (operator === '+' && product.quantity > 0) {
          product.quantity += 1;
          return product;
        }
      } return product;
    });
    this.setState({ listaProdutos: produtoDiminuir });
  };

  adicionaCarrinho = (referencia) => {
    const { produtosResultado, listaProdutos } = this.state;
    const filtroInfo = produtosResultado.filter((product) => product.title === referencia)
      .reduce((acc, curr) => curr, {});
    const filtroInfo2 = { ...filtroInfo, quantity: 1 };
    this.aumentaDiminui(referencia, filtroInfo);
    const trueOrFalse = listaProdutos.some((produto) => (
      produto.title === referencia
    ));
    if (!trueOrFalse) {
      this.setState({ listaProdutos: [...listaProdutos, filtroInfo2],
      });
    }
    this.defineLocalStorage('listaProdutos', filtroInfo2);
  };

  deletaDoCarrinho = (referencia) => {
    const { listaProdutos } = this.state;
    const result = listaProdutos.filter((product) => product.title !== referencia);
    this.setState({ listaProdutos: result });
    this.deletaLocalStorage(referencia, 'listaProdutos');
  };

  localStorageHandler = (numero) => {
    this.setState({
      listaProdutos: numero,
    });
  };

  render() {
    const {
      buscaInput, produtosResultado,
      meusProdutos, listaProdutos,
      categoriaLista, carregaCarrinho,
    } = this.state;
    return (
      <Switch>
        <Route
          path="/productDetails/:id"
          render={
            (props) => (<DetalhesProduto
              { ...props }
              adicionaCarrinho={ this.adicionaCarrinho }
            />)
          }
        />
        <Route
          path="/shopping"
          render={ () => (
            <CarrinhoCompra
              carregando={ carregaCarrinho }
              meusProdutos={ meusProdutos }
              listaProdutos={ listaProdutos }
              localStorageHandler={ this.localStorageHandler }
              aumentaDiminui={ this.aumentaDiminui }
              deletaDoCarrinho={ this.deletaDoCarrinho }
            />
          ) }
        />
        <Route
          exact
          path="/"
          render={ () => (
            <PaginaInicial
              handleChange={ this.handleChange }
              acessarProdutosApi={ this.acessarProdutosApi }
              acessarProdutosCategoria={ this.acessarProdutosCategoria }
              adicionaCarrinho={ this.adicionaCarrinho }
              buscaInput={ buscaInput }
              produtosResultado={ produtosResultado }
              categoriaLista={ categoriaLista }
            />
          ) }
        />
      </Switch>
    );
  }
}
