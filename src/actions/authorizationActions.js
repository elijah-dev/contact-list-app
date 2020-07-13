import {
  AUTHORIZATION_IN_PROGRESS,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
  DEAUTHORIZE_USER
} from './';

export const authorizationInProgress = () => {
  return {
    type: AUTHORIZATION_IN_PROGRESS
  };
};

export const authorizationSuccess = data => {
  return {
    type: AUTHORIZATION_SUCCESS,
    data
  };
};

export const authorizationFailure = error => {
  return {
    type: AUTHORIZATION_FAILURE,
    error
  };
};

export const deauthorizeUser = () => {
  return {
    type: DEAUTHORIZE_USER
  };
};
