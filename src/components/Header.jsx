import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const userInformation = await getUser();
    this.setState({ userName: userInformation.name, loading: false });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        {loading ? <Loading /> : <h2 data-testid="header-user-name">{userName}</h2>}
      </header>
    );
  }
}
