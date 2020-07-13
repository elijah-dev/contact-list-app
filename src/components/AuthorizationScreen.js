import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Container,
  Paper,
  Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { jsonServerUrl as url } from '../data/urls';
import axios from 'axios';
import {
  authorizationInProgress,
  authorizationSuccess,
  authorizationFailure
} from '../actions/authorizationActions';
import { StateContext, DispatchContext } from '../Context';

const useStyles = makeStyles({
  formContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '200px',
    width: '300px',
    margin: '50px 30px'
  }
});

const AuthorizationScreen = () => {
  const classes = useStyles();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  // Тут сразу заполнил поля, чтоб не нужно было
  // каждый раз печатать и можно было просто войти
  const [credentials, setCredentials] = useState({
    username: 'someuser',
    password: '1234'
  });

  const handleChange = field => {
    const formValue = credentials;
    formValue[field.name] = field.value;
    setCredentials(formValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(authorizationInProgress());
    axios
      // Так как использую json-placeholder, то авторизация реализована
      // путем простого поиска пользователя по юзернейму через GET реквест
      // после чего сравнивается пароль введенный в форму и возвращенный сервером
      // Разумеется, в полноценном приложении данные передавал бы POST реквестом
      // и вся авторизация проходила бы на бэкенде
      .get(`${url}/auth?username=${credentials.username}`)
      .then(res => {
        const data = res.data[0];
        if (!data) {
          throw new Error('Пользователь не найден');
        }
        if (data.password !== credentials.password) {
          throw new Error('Неверный пароль');
        }
        dispatch(authorizationSuccess(data.username));
      })
      .catch(error => dispatch(authorizationFailure(error.message)));
  };

  return (
    <Container className={classes.formContainer}>
      <Paper elevation={3}>
        <form
          id='loginForm'
          className={classes.loginForm}
          name='loginForm'
          onSubmit={event => handleSubmit(event)}>
          <TextField
            id='usernameField'
            name='username'
            label='Имя пользователя'
            variant='outlined'
            defaultValue={credentials.username}
            onChange={event => handleChange(event.target)}
            required
          />
          <TextField
            id='passwordField'
            name='password'
            label='Пароль'
            variant='outlined'
            defaultValue={credentials.password}
            onChange={event => handleChange(event.target)}
            required
          />

          <Button type='submit' color='primary' variant='contained'>
            Войти
          </Button>
        </form>
        <Snackbar
          open={state.currentUser.error.isError}
          message={state.currentUser.error.message}
        />
      </Paper>
    </Container>
  );
};

export default AuthorizationScreen;
