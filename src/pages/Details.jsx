import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Details extends Component {
  state = {
    price: 0,
    image: '',
    title: '',
  };

  componentDidMount() {
    this.getItem();
  }

  getItem = async () => {
    const { match: { params: { id } } } = this.props;
    this.fetchProduct(id);
  };

  // checando se erro no github foi resolvido

  fetchProduct = async (productId) => {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();

    this.setState({
      price: data.price,
      image: data.thumbnail,
      title: data.title,
    });
  };

  render() {
    const {
      price,
      image,
      title,
    } = this.state;
    const { history } = this.props;

    return (
      <section>
        <div>
          <h2 data-testid="product-detail-name">{title}</h2>
          <img
            data-testid="product-detail-image"
            src={ image }
            alt={ `imagem de um ${title}` }
          />
          <h2 data-testid="product-detail-price">{price}</h2>
        </div>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Add to cart
        </button>
      </section>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
