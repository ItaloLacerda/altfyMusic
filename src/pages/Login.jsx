import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    name: '',
    loading: false,
    redirect: false,
  };

  handelChange = ({ target }) => {
    this.setState({
      name: target.value,
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
    const { name, redirect, loading } = state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-login">
            {redirect && <Redirect to="/search" /> }
            <form>
              <label htmlFor="login">
                <input
                  data-testid="login-name-input"
                  id="login"
                  type="text"
                  onChange={ this.handelChange }
                  value={ name }
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
