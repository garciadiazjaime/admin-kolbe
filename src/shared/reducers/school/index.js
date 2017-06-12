import {
  REQUEST_SCHOOL,
  RECEIVE_SCHOOL,
  SELECT_SCHOOL,
  INVALIDATE_SCHOOL,
} from '../../actions/school';
import { USER_LOGGED_IN } from '../../actions/user';


export function selectedSchool(state = '', action) {
  switch (action.type) {
    case SELECT_SCHOOL:
      return action.schoolId;
    default:
      return state;
  }
}

export function userLoggedIn(state = false, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.value;
    default:
      return state;
  }
}

function school(state = {
  isFetching: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case INVALIDATE_SCHOOL:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_SCHOOL:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_SCHOOL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.school,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export function schoolById(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SCHOOL:
    case RECEIVE_SCHOOL:
    case REQUEST_SCHOOL:
      return Object.assign({}, state, {
        [action.schoolId]: school(state[action.schoolId], action),
      });
    default:
      return state;
  }
}
