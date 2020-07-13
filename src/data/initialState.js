const initialState = {
  currentUser: {
    inProgress: false,
    isAuthorized: false,
    data: null,
    error: {
      isError: false,
      message: ''
    }
  },
  contacts: {
    inProgress: false,
    data: [],
    error: {
      isError: false,
      message: ''
    }
  },
  contactForm: {
    isOpen: false,
    data: {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: ''
    }
  },
  searchFilter: {
    data: ''
  }
};

export default initialState;
