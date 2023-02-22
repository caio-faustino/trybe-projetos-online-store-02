import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class productQuery extends Component {
  render() {
    const { image, price, title } = this.props;
    return (
      <Link
        data-testid="product-detail-link"
        to={ `/Details/${id}` }
      >
        <section data-testid="product">
          <h2>{title}</h2>
          <img src={ image } alt={ `imagem de um ${title}` } />
          <h2>{price}</h2>
        </section>
      </Link>
    );
  }
}

productQuery.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default productQuery;
