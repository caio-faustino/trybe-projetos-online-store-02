import React, { Component } from 'react';
import { getCategories } from '../services/api';
import Search from '../components/Search';

export default class Home extends Component {
  render() {
    console.log(getCategories());
    return (
      <Search />
    );
  }
}
