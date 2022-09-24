import React, { Component } from 'react';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <p>Carregando...</p>
    );
  }
}
