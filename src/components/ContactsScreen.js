import React, { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import NavBar from './NavBar';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { StateContext } from '../Context';

const ContactsScreen = () => {
  const state = useContext(StateContext);

  return (
    <React.Fragment>
      <ContactForm />
      <NavBar />
      <ContactList />
      <Snackbar
        open={state.contacts.error.isError}
        message={state.contacts.error.message}
      />
    </React.Fragment>
  );
};

export default ContactsScreen;
