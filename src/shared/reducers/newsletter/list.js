import { REQUEST_NEWSLETTERS, RECEIVE_NEWSLETTERS } from '../../actions/newsletter/list';

function newsletter(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_NEWSLETTERS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_NEWSLETTERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.newsletters,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function newslettersByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_NEWSLETTERS:
    case RECEIVE_NEWSLETTERS:
      return Object.assign({}, state, {
        [action.groupId]: newsletter(state[action.groupId], action),
      });
    default:
      return state;
  }
}
