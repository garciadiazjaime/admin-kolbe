import {
  API_ERROR,
} from '../../actions/api';

export const TEST = 'TEST';

export function apiHelper(state = { }, action) {
  switch (action.type) {
    case API_ERROR:
      return {
        error: API_ERROR,
      };
    default:
      return state;
  }
}
