import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESPONSE,
  SELECT_ROLE,
  USER_LOGIN_FAILED,
} from '../../actions/user';


export function selectedRole(state = null, action) {
  switch (action.type) {
    case SELECT_ROLE:
      return action.role;
    default:
      return state;
  }
}

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
    case USER_LOGIN_FAILED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: true,
      });
    default:
      return state;
  }
}

export function userHelper(state = { }, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_RESPONSE:
    case USER_LOGIN_FAILED:
      return user(state.user, action);
    default:
      return state;
  }
}
