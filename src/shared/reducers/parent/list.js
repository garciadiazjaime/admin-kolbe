import { REQUEST_PARENTS, RECEIVE_PARENTS } from '../../actions/parent/list';

function parent(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_PARENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_PARENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.parents,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function parentsByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_PARENTS:
    case RECEIVE_PARENTS:
      return Object.assign({}, state, {
        [action.groupId]: parent(state[action.groupId], action),
      });
    default:
      return state;
  }
}
