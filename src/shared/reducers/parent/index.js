import { SELECT_PARENT, SAVING_PARENT, PARENT_SAVED, REQUEST_PARENT, RECEIVE_PARENT } from '../../actions/parent';

export function selectedParent(state = '', action) {
  switch (action.type) {
    case SELECT_PARENT:
      return action.parentId;
    default:
      return state;
  }
}

function parent(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case REQUEST_PARENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_PARENT:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.parent,
      });
    case SAVING_PARENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
        lastUpdated: null,
      });
    case PARENT_SAVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,

      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function parentHelper(state = { }, action) {
  switch (action.type) {
    case REQUEST_PARENT:
    case RECEIVE_PARENT:
    case SAVING_PARENT:
    case PARENT_SAVED:
      return parent(state.parent, action);
    default:
      return state;
  }
}
