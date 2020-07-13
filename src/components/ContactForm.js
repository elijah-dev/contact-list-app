import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext, DispatchContext } from '../Context';
import {
  requestContactsInProgress,
  requestContactsSuccess,
  requestContactsFailure
} from '../actions/contactsActions';
import { closeContactForm } from '../actions/contactsFormActions';
import axios from 'axios';
import { jsonServerUrl as url } from '../data/urls';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '500px'
  }
});

const ContactForm = () => {
  const classes = useStyles();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [formData, setFormData] = useState(state.contactForm.data);

  useEffect(() => {
    setFormData(state.contactForm.data);
  }, [state.contactForm.data]);

  const handleChange = field => {
    let newFormData = formData;
    newFormData[field.name] = field.value;
    setFormData({ ...newFormData });
  };

  const handleCancel = () => {
    dispatch(closeContactForm());
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(requestContactsInProgress());

    // Если id уже заполнено, значит мы обновляем
    // существующий контакт путем PATCH реквеста.
    // Так как json-placeholder не сохраняет данные между запросами
    // то при попытке апдейта вновь созданного контакта всегда будет 404
    if (formData.id) {
      axios
        .patch(`${url}/contacts/${formData.id}`, formData)
        .then(res => {
          let newContacts = [...state.contacts.data];
          const updateIndex = newContacts.findIndex(
            contact => contact.id === res.data.id
          );
          newContacts[updateIndex] = res.data;
          dispatch(requestContactsSuccess([...newContacts]));
          dispatch(closeContactForm());
        })
        .catch(error => dispatch(requestContactsFailure(error.message)));
    } else {
      // Если id нет, то генерируем id и делаем POST реквест
      // для создания нового контакта
      let postData = { ...formData };
      postData.id = uuid();
      axios
        .post(`${url}/contacts/`, postData)
        .then(res => {
          let newContacts = [...state.contacts.data];
          newContacts.unshift(res.data);
          dispatch(requestContactsSuccess([...newContacts]));
          dispatch(closeContactForm());
        })
        .catch(error => dispatch(requestContactsFailure(error)));
    }
  };

  return (
    <Dialog open={state.contactForm.isOpen}>
      <DialogTitle>
        {state.contactForm.data.id ? 'Редактировать контакт' : 'Новый контакт'}
      </DialogTitle>
      <DialogContent>
        <form
          className={classes.form}
          onSubmit={event => handleSubmit(event)}
          id='contactsForm'>
          <TextField
            name='firstName'
            label='Имя'
            defaultValue={state.contactForm.data.firstName}
            onChange={event => handleChange(event.target)}
          />
          <TextField
            name='lastName'
            label='Фамилия'
            defaultValue={state.contactForm.data.lastName}
            onChange={event => handleChange(event.target)}
          />
          <TextField
            name='phone'
            label='Телефон'
            defaultValue={state.contactForm.data.phone}
            onChange={event => handleChange(event.target)}
          />
          <TextField
            name='email'
            label='Email'
            defaultValue={state.contactForm.data.email}
            onChange={event => handleChange(event.target)}
          />
          <TextField
            name='address'
            label='Адрес'
            defaultValue={state.contactForm.data.address}
            onChange={event => handleChange(event.target)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={handleCancel}>
          Отменить
        </Button>
        <Button color='primary' type='submit' form='contactsForm'>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm;
