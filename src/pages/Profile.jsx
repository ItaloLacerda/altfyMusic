import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    userName: '',
    profilePicture: '',
    email: '',
    description: '',
  };

  async componentDidMount() {
    const userInformation = await getUser();
    this.setState({
      userName: userInformation.name,
      profilePicture: userInformation.image,
      email: userInformation.email,
      description: userInformation.description,
    });
  }

  render() {
    const { userName, profilePicture, email, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section>
          <Link to="/profile/edit">Editar perfil</Link>
          <img src={ profilePicture } alt={ userName } data-testid="profile-image" />
          <h3>Nome</h3>
          <p>{userName}</p>
          <h3>Email</h3>
          <p>{email}</p>
          <h3>Descrição</h3>
          <p>{description}</p>
        </section>
      </div>
    );
  }
}
