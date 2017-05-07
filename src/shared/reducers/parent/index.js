import { SAVING_PARENT, PARENT_SAVED, REQUEST_PARENT, RECEIVE_PARENT } from '../../actions/parent';


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
      });
    case PARENT_SAVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        groupId: action.groupId,
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
