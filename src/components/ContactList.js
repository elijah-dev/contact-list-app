import React, { useContext, useEffect } from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import axios from 'axios';
import { jsonServerUrl as url } from '../data/urls';
import { StateContext, DispatchContext } from '../Context';
import {
  requestContactsInProgress,
  requestContactsSuccess,
  requestContactsFailure
} from '../actions/contactsActions';

const ContactList = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  // Первоначальный запрос списка контактов при первом рендере
  useEffect(() => {
    dispatch(requestContactsInProgress());
    axios
      .get(`${url}/contacts`)
      .then(res => {
        dispatch(requestContactsSuccess(res.data));
      })
      .catch(error => {
        dispatch(requestContactsFailure(error.message));
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth='md' style={{ paddingTop: '56px' }}>
      <List>
        {state.contacts.data.map(contact => {
          if (
            contact.firstName.toLowerCase().includes(state.searchFilter.data) ||
            contact.lastName.toLowerCase().includes(state.searchFilter.data)
          ) {
            return (
              <ListItem id={contact.id} key={contact.id} divider>
                <ListItemText
                  primary={contact.firstName + ' ' + contact.lastName}
                  secondary={
                    <React.Fragment>
                      Телефон: {contact.phone}
                      <br />
                      Email: {contact.email}
                      <br />
                      Адрес: {contact.address}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction edge='end'>
                  <EditButton data={contact} />
                  <DeleteButton id={contact.id} />
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </Container>
  );
};

export default ContactList;
