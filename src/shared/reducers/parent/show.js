import {
  REQUEST_GROUPS_BY_PARENT,
  RECEIVE_GROUPS_BY_PARENT,
} from '../../actions/parent/show';

function parent(state = {
  isProcessing: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_GROUPS_BY_PARENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_GROUPS_BY_PARENT:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.groups,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function groupsByParent(state = { }, action) {
  switch (action.type) {
    case REQUEST_GROUPS_BY_PARENT:
    case RECEIVE_GROUPS_BY_PARENT:
      return Object.assign({}, state, {
        [action.parentId]: parent(state[action.parentId], action),
      });
    default:
      return state;
  }
}
