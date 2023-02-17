import React, { Component } from 'react';
import { getCategories } from '../services/api';
import CategoryBtn from './CategoryBtn';

export default class Category extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const handleCategories = await getCategories();
    this.setState({
      categories: handleCategories
        .map(({ name, id }) => <CategoryBtn key={ id } name={ name } id={ id } />),
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h6>Categorias:</h6>
        { categories === null ? 'Loading...' : categories }
      </div>
    );
  }
}
