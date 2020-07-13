import React, { useContext } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../Context';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#fff'
  }
}));

const LoadingBackdrop = () => {
  const state = useContext(StateContext);
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={state.contacts.inProgress || state.currentUser.inProgress}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingBackdrop;
