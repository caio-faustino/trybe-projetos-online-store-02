import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class productQuery extends Component {
  render() {
    const { image, price, title } = this.props;
    return (
      <section data-testid="product">
        <section>
          <h2>{title}</h2>
          <img src={ image } alt={ `imagem de um ${title}` } />
          <h2>{price}</h2>
        </section>
      </section>
    );
  }
}

productQuery.propTypes = {
  // id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default productQuery;
