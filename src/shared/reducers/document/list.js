import { REQUEST_DOCUMENTS, RECEIVE_DOCUMENTS } from '../../actions/document/list';

function document(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_DOCUMENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_DOCUMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.documents,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function documentsByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_DOCUMENTS:
    case RECEIVE_DOCUMENTS:
      return Object.assign({}, state, {
        [action.groupId]: document(state[action.groupId], action),
      });
    default:
      return state;
  }
}
