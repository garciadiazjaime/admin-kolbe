import { REQUEST_LOCATION, RECEIVE_LOCATION, SELECT_LOCATION, INVALIDATE_LOCATION } from '../../actions/location';


export function selectedLocation(state = '', action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return action.locationId;
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
