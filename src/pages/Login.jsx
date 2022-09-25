import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper, TextField, Typography,
} from '@mui/material';

import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

import {
  CustonButton, CustonForm, CustonPaper, styleBackgroundLongin,
} from '../styles/LoginPage';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      description: '',
      loading: false,
      redirect: false,
    };
  }

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
    const {
      redirect, loading, email, description,
    } = state;
    return (
      loading ? <Loading />
        : (
          <Paper sx={styleBackgroundLongin.paperContainer}>
            {redirect && <Redirect to="/search" /> }
            <Typography variant="h1" gutterBottom>
              ALTFYMUSIC
            </Typography>
            <CustonForm>
              <CustonPaper>
                <Typography variant="h3" gutterBottom>
                  Bem-Vindo De Volta
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Faça login para acessar sua conta
                </Typography>
                <Box sx={styleBackgroundLongin.boxContainer}>
                  <Typography variant="subtitle2" gutterBottom>E-mail</Typography>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    id="email"
                    type="email"
                    onChange={this.handelChange}
                    value={email}
                  />

                  <Typography sx={styleBackgroundLongin.passwordContainer} variant="subtitle2" gutterBottom>Password</Typography>
                  <TextField
                    name="description"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    id="description"
                    type="password"
                    onChange={this.handelChange}
                    value={description}
                  />

                  <FormControlLabel
                    sx={styleBackgroundLongin.checkboxContainer}
                    value="end"
                    control={<Checkbox color="default" />}
                    label="Lembre-me"
                    labelPlacement="end"
                  />

                  <CustonButton
                    disabled={(email.length < minimumCharacters)}
                    sx={styleBackgroundLongin.buttonContainer}
                    type="button"
                    fullWidth
                    onClick={this.handelClick}
                    data-testid="login-submit-button"
                  >
                    Entrar
                  </CustonButton>
                </Box>
                <Typography
                  sx={styleBackgroundLongin.body1Container}
                  variant="body1"
                  gutterBottom
                >
                  Não tem conta?
                  <Button sx={styleBackgroundLongin.linkContainer} variant="text">Inscrever-se</Button>
                </Typography>
              </CustonPaper>
            </CustonForm>
          </Paper>
        )
    );
  }
}
