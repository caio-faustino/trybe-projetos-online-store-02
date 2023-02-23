import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { getCategories } from '../services/api';
// import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Category from '../components/Category';
import { getQueryByProdutc } from '../services/api';
import ProductQuery from '../components/ProductQuery';

export default class Home extends Component {
  state = {
    productQuery: [],
    valueText: '',
    msg: '',
  };

  clickSearch = async (event) => {
    event.preventDefault();
    const { valueText } = this.state;
    const response = await getQueryByProdutc(valueText);
    this.setState({
      productQuery: response.results,
      msg: response.results.length <= 0 && 'Nenhum produto foi encontrado',
    });
  };

  clickCart = () => {
    const {
      history: { push } } = this.props;
    push('/cart');
  };

  handleChange = ({
    target: { value } }) => {
    this.setState({
      valueText: value,
    });
  };

  render() {
    const { msg, productQuery,
    } = this.state;
    return (
      <div>
        <Search />
        <Category />
        <div>
          <form>
            <input
              type="text"
              data-testid="query-input"
              onChange={
                this.handleChange
              }
            />
            <button
              data-testid="query-button"
              onClick={
                this.clickSearch
              }
            >
              Pesquisar
            </button>
            <section>
              <button
                type="button"
                data-testid="shopping-cart-button"
                onClick={
                  this.clickCart
                }
              >
                Carrinho
              </button>
            </section>
          </form>
          { productQuery.length > 0 ? productQuery.map((product) => (
            <ProductQuery
              image={ product.thumbnail }
              key={ product.id }
              price={ product.price }
              name={ product.title }
            />
          ))
            : <p>{msg}</p>}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.objectOf().isRequired,
};
