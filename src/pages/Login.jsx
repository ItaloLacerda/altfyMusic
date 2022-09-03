import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    name: '',
    image: '',
    email: '',
    description: '',
    loading: false,
    redirect: false,
  };

  handelChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handelClick = async () => {
    const { state } = this;
    this.setState({ loading: true });
    await createUser(state);
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const minimumCharacters = 3;
    const { state } = this;
    const { name, redirect, loading, image, email, description } = state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-login">
            {redirect && <Redirect to="/search" /> }
            <form>
              <label htmlFor="image">
                <input
                  name="image"
                  id="image"
                  type="text"
                  onChange={ this.handelChange }
                  value={ image }
                />
              </label>
              <label htmlFor="login">
                <input
                  name="name"
                  id="login"
                  type="text"
                  onChange={ this.handelChange }
                  value={ name }
                />
              </label>
              <label htmlFor="email">
                <input
                  name="email"
                  id="email"
                  type="email"
                  onChange={ this.handelChange }
                  value={ email }
                />
              </label>
              <label htmlFor="description">
                <input
                  name="description"
                  id="description"
                  type="text"
                  onChange={ this.handelChange }
                  value={ description }
                />
              </label>
              <button
                disabled={ (name.length < minimumCharacters) }
                type="button"
                onClick={ this.handelClick }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}
