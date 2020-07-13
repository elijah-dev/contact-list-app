import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { openContactForm } from '../actions/contactsFormActions';
import { StateContext, DispatchContext } from '../Context';

const AddButton = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const handleClick = () => {
    dispatch(openContactForm(state.contactForm.data));
  };

  return (
    <Button
      onClick={handleClick}
      color='primary'
      variant='contained'
      disableElevation>
      Добавить
    </Button>
  );
};

export default AddButton;
