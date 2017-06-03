import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESPONSE,
} from '../../actions/user';

function user(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case USER_LOGIN_RESPONSE:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.user,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function userHelper(state = { }, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_RESPONSE:
      return user(state.user, action);
    default:
      return state;
  }
}
