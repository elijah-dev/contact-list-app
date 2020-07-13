import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import axios from 'axios';
import { jsonServerUrl as url } from '../data/urls';
import { StateContext, DispatchContext } from '../Context';
import {
  requestContactsInProgress,
  requestContactsSuccess,
  requestContactsFailure
} from '../actions/contactsActions';

const DeleteButton = props => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  // Так как json-placeholder не сохраняет данные между запросами
  // то при попытке удаления вновь созданного контакта всегда будет 404
  // и так как при успешном DELETE запросе возвращается пустой объект,
  // то мы просто ждем положительного ответа от сервера
  // после чего ищем контакт по id и удаляем

  const handleClick = () => {
    dispatch(requestContactsInProgress());
    axios
      .delete(`${url}/contacts/${props.id}`)
      .then(() => {
        const newContacts = state.contacts.data.filter(
          contact => contact.id !== props.id
        );
        dispatch(requestContactsSuccess(newContacts));
      })
      .catch(error => {
        dispatch(requestContactsFailure(error.message));
      });
  };

  return (
    <IconButton onClick={handleClick}>
      <Delete />
    </IconButton>
  );
};

export default DeleteButton;
