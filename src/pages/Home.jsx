import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Home extends Component {
  render() {
    console.log(getCategories());
    return (
      <h1>Home</h1>
    );
  }
}
