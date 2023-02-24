import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategory } from '../services/api';

export default class CategoryBtn extends Component {
  state = {
    categorySelected: [],
  };

  productSelected = async (id) => {
    const categorySelected = await getProductsFromCategory(id);
    console.log(categorySelected);
    console.log(id);
    this.setState({ categorySelected: categorySelected.results });
  };

  render() {
    const { name, id } = this.props;
    const { categorySelected } = this.state;

    return (
      <div>
        <button
          data-testid="category"
          id={ id }
          type="button"
          value={ name }
          onClick={ () => this.productSelected(id) }
        >
          { name }
        </button>
        <Link
          data-testid="product-detail-link"
          to={ `/details/${id}` }
        >
          <div className="products">
            {
              categorySelected.map((item) => (
                <div key={ item.id } data-testid="product">
                  <p>{item.title}</p>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <p>{item.price}</p>
                </div>
              ))
            }
          </div>
        </Link>
      </div>
    );
  }
}

CategoryBtn.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
