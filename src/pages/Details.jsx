import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class Details extends Component {
  state = {
    product: {},
    // price: 0,
    // image: '',
    // title: '',
  };

  componentDidMount() {
    this.getItem();
  }

  getItem = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  // esperrando correção de erro

  // fetchProduct = async (productId) => {
  //   const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  //   const data = await response.json();

  //   this.setState({
  //     price: data.price,
  //     image: data.thumbnail,
  //     title: data.title,
  //   });
  // };

  render() {
    const {
      product:
      {
        id,
        price,
        thumbnail,
        title,
      },
    } = this.state;
    const { history } = this.props;

    return (
      <>
        <section>
          <div>
            <h2 data-testid="product-detail-name">{title}</h2>
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ `imagem de um ${title}` }
            />
            <h2 data-testid="product-detail-price">{price}</h2>
          </div>
          <button
            type="button"
            data-testid="shopping-cart-button"
            value={ id }
            onClick={ () => history.push('/cart') }
          >
            Add to cart
          </button>
        </section>
        <Link to="/" alt="return">return</Link>
      </>
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
