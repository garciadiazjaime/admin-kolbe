import { REQUEST_LOCATIONS, RECEIVE_LOCATIONS, SELECT_SCHOOL, INVALIDATE_SCHOOL } from '../../actions/location/list';
import { REQUEST_LOCATION, RECEIVE_LOCATION, SELECT_LOCATION, INVALIDATE_LOCATION } from '../../actions/location';

export function selectedSchool(state = 'koolbe', action) {
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

export function locationsBySchool(state = '', action) {
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


// =================== LOCATION ===================

export function selectedLocation(state = {}, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return action.location;
    default:
      return state;
  }
}

function location(state = {
  isFetching: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case INVALIDATE_LOCATION:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_LOCATION:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_LOCATION:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.location,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export function locationById(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_LOCATION:
    case RECEIVE_LOCATION:
    case REQUEST_LOCATION:
      return Object.assign({}, state, {
        [action.location]: location(state[action.location], action),
      });
    default:
      return state;
  }
}
