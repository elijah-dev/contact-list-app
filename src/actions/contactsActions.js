import {
  REQUEST_CONTACTS_IN_PROGRESS,
  REQUEST_CONTACTS_SUCCESS,
  REQUEST_CONTACTS_FAILURE
} from './';

export const requestContactsInProgress = () => {
  return {
    type: REQUEST_CONTACTS_IN_PROGRESS
  };
};

export const requestContactsSuccess = data => {
  return {
    type: REQUEST_CONTACTS_SUCCESS,
    data: data
  };
};

export const requestContactsFailure = error => {
  return {
    type: REQUEST_CONTACTS_FAILURE,
    error
  };
};
