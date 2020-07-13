import {
  AUTHORIZATION_IN_PROGRESS,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
  DEAUTHORIZE_USER,
  REQUEST_CONTACTS_IN_PROGRESS,
  REQUEST_CONTACTS_SUCCESS,
  REQUEST_CONTACTS_FAILURE,
  OPEN_CONTACT_FORM,
  CLOSE_CONTACT_FORM,
  SET_SEARCH_FILTER
} from '../actions';

export const rootReducer = (state, action) => {
  switch (action.type) {
    case AUTHORIZATION_IN_PROGRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          inProgress: true,
          error: {
            isError: false,
            message: ''
          }
        }
      };
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          inProgress: false,
          isAuthorized: true,
          data: action.data
        }
      };
    case AUTHORIZATION_FAILURE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          inProgress: false,
          isAuthorized: false,
          error: {
            isError: true,
            message: action.error
          }
        }
      };
    case DEAUTHORIZE_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          inProgress: false,
          isAuthorized: false,
          data: null
        }
      };
    case REQUEST_CONTACTS_IN_PROGRESS:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          inProgress: true,
          error: {
            isError: false,
            message: ''
          }
        }
      };
    case REQUEST_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          inProgress: false,
          data: [...action.data]
        }
      };
    case REQUEST_CONTACTS_FAILURE:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          inProgress: false,
          error: {
            isError: true,
            message: action.error
          }
        }
      };
    case OPEN_CONTACT_FORM:
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          isOpen: true,
          data: {
            ...state.contactForm.data,
            ...action.data
          }
        }
      };
    case CLOSE_CONTACT_FORM:
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          isOpen: false,
          data: {
            ...state.contactForm.data,
            id: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: ''
          }
        }
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: {
          data: action.data
        }
      };
    default:
      return state;
  }
};
