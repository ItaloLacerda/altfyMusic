import React, { Component } from 'react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div data-testid="page-not-found">NotFound</div>
    );
  }
}
