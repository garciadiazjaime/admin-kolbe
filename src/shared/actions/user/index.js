import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';
import { apiError } from '../api';

export const SELECT_USER = 'SELECT_USER';
export const SELECT_ROLE = 'SELECT_ROLE';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_RESPONSE = 'USER_LOGIN_RESPONSE';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export function selectUser(user) {
  return {
    type: SELECT_USER,
    user,
  };
}

export function selectRole(role) {
  return {
    type: SELECT_ROLE,
    role,
  };
}

export function loggedUser(value) {
  return {
    type: USER_LOGGED_IN,
    value,
  };
}

function userLogin() {
  return {
    type: USER_LOGIN_REQUEST,
  };
}

function userLoginResponse(response) {
  if (response.entity.status) {
    return {
      type: USER_LOGIN_RESPONSE,
      user: response.entity.data,
    };
  }
  return {
    type: USER_LOGIN_FAILED,
  };
}

function loginHelper(username, password) {
  return (dispatch) => {
    dispatch(userLogin());
    const data = {
      username,
      password,
    };
    return RequestUtil.post(`${constants.apiUrl}/login`, data)
      .then(response => dispatch(userLoginResponse(response)))
      .catch(() => dispatch(apiError('userLogin')));
  };
}

function shouldProccessUser(state) {
  const user = state.userHelper;
  return user && user.isProcessing !== true;
}

export function login(username, password) {
  return (dispatch, getState) => {
    if (shouldProccessUser(getState())) {
      return dispatch(loginHelper(username, password));
    }
    return null;
  };
}
