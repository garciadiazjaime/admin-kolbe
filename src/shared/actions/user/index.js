import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const SELECT_USER = 'SELECT_USER';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_RESPONSE = 'USER_LOGIN_RESPONSE';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export function selectUser(user) {
  return {
    type: SELECT_USER,
    user,
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
  return {
    type: USER_LOGIN_RESPONSE,
    user: response.entity.data,
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
      .then(response => dispatch(userLoginResponse(response)));
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
