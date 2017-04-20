import { REQUEST_LOCATIONS, RECEIVE_LOCATIONS } from '../../actions/location/list';
import { RECEIVE_SCHOOL } from '../../actions/school';


function locations(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
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

export const TEST = 'TEST';

export function locationsBySchool(state = '', action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
    case RECEIVE_SCHOOL:
      return Object.assign({}, state, {
        [action.school]: locations(state[action.school], action),
      });
    default:
      return state;
  }
}
