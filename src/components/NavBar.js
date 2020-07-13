import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { StateContext, DispatchContext } from '../Context';
import AddButton from './AddButton';
import SearchField from './SearchField';
import { deauthorizeUser } from '../actions/authorizationActions';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography className={classes.title} variant='h5' noWrap>
            Контакты
          </Typography>
          <SearchField />
          <AddButton />
          <div className={classes.grow} />
          <div className={classes.userInfo}>
            <Typography variant='h6'>{state.currentUser.data}</Typography>
            <IconButton
              color='inherit'
              onClick={() => dispatch(deauthorizeUser())}>
              <ExitToApp />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
