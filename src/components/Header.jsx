import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    loading: true,
    userName: '',
  };

  async componentDidMount() {
    const userInformation = await getUser();
    this.setState({ userName: userInformation.name, loading: false });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        {loading ? <Loading /> : <h2 data-testid="header-user-name">{userName}</h2>}
      </header>
    );
  }
}
