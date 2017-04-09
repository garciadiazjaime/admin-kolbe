import { combineReducers } from 'redux';

import { REQUEST_LOCATIONS, RECEIVE_LOCATIONS, SELECT_SCHOOL, INVALIDATE_SCHOOL } from '../actions';

function selectedSchool(state = 'koolbe', action) {
  switch (action.type) {
    case SELECT_SCHOOL:
      return action.school;
    default:
      return state;
  }
}

function locations(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_SCHOOL:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.locations,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function locationsBySchool(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SCHOOL:
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        [action.school]: locations(state[action.school], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  locationsBySchool,
  selectedSchool,
});

export default rootReducer;
