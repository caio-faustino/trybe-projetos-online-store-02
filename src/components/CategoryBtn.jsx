import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CategoryBtn extends Component {
  render() {
    const { name, id } = this.props;

    return (
      <button data-testid="category" key={ id } value={ name }>{ name }</button>
    );
  }
}

CategoryBtn.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
