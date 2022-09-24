import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      image: '',
      email: '',
      description: '',
      disabled: true,
      loading: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    const userInformation = await getUser();
    this.setState({
      inputName: userInformation.name,
      image: userInformation.image,
      email: userInformation.email,
      description: userInformation.description,
      loading: false,
    }, () => this.enableButton());
  }

  enableButton = () => {
    const {
      inputName, image, email, description,
    } = this.state;

    const valueName = inputName !== '';
    const valueImage = image !== '';
    const valueEmail = email !== '';
    const valueDescription = description !== '';
    const enableButton = valueName && valueImage && valueEmail && valueDescription;

    if (enableButton) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handelChange = ({ target }) => {
    this.enableButton();
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handelClick = async () => {
    const {
      inputName, image, email, description,
    } = this.state;
    const userInformation = {
      name: inputName,
      email,
      image,
      description,
    };
    this.setState({ loading: true });
    await updateUser(userInformation);
    this.setState({ loading: false, redirect: true });
  };

  render() {
    const {
      inputName, image, email, description,
      loading, disabled, redirect,
    } = this.state;
    return (
      <>
        {redirect && <Redirect to="/profile" />}
        <div data-testid="page-profile-edit">
          <Header />
          {loading ? <Loading /> : (
            <form>
              <label htmlFor="image">
                <input
                  data-testid="edit-input-image"
                  name="image"
                  id="image"
                  type="text"
                  onChange={this.handelChange}
                  value={image}
                />
              </label>
              <label htmlFor="login">
                <input
                  data-testid="edit-input-name"
                  name="inputName"
                  id="login"
                  type="text"
                  onChange={this.handelChange}
                  value={inputName}
                />
              </label>
              <label htmlFor="email">
                <input
                  data-testid="edit-input-email"
                  name="email"
                  id="email"
                  type="email"
                  onChange={this.handelChange}
                  value={email}
                />
              </label>
              <label htmlFor="description">
                <input
                  data-testid="edit-input-description"
                  name="description"
                  id="description"
                  type="text"
                  onChange={this.handelChange}
                  value={description}
                />
              </label>
              <button
                type="submit"
                disabled={disabled}
                data-testid="edit-button-save"
                onClick={this.handelClick}
              >
                Editar perfil
              </button>
            </form>
          )}
        </div>
      </>
    );
  }
}
