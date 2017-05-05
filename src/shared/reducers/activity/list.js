import { REQUEST_ACTIVITIES, RECEIVE_ACTIVITIES } from '../../actions/activity/list';

function activity(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.activities,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function activitiesByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, state, {
        [action.groupId]: activity(state[action.groupId], action),
      });
    default:
      return state;
  }
}
