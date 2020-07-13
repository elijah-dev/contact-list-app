import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { DispatchContext } from '../Context';
import { openContactForm } from '../actions/contactsFormActions';

const EditButton = props => {
  const dispatch = useContext(DispatchContext);
  const handleClick = () => {
    dispatch(openContactForm(props.data));
  };

  return (
    <IconButton onClick={handleClick}>
      <Edit />
    </IconButton>
  );
};

export default EditButton;
