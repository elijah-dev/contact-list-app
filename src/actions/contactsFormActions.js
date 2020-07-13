import { OPEN_CONTACT_FORM, CLOSE_CONTACT_FORM } from './';

export const openContactForm = data => {
  return {
    type: OPEN_CONTACT_FORM,
    data
  };
};

export const closeContactForm = () => {
  return {
    type: CLOSE_CONTACT_FORM
  };
};
