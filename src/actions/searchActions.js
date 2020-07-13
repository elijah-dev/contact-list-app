import { SET_SEARCH_FILTER } from './index';

export const setSearchFilter = data => {
  return { type: SET_SEARCH_FILTER, data };
};
