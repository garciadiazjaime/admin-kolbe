import {
  SAVING_DOCUMENT,
  DOCUMENT_SAVED,
  REQUEST_DOCUMENT,
  RECEIVE_DOCUMENT,
} from '../../actions/document';

function document(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case REQUEST_DOCUMENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_DOCUMENT:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.document,
      });
    case SAVING_DOCUMENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
        lastUpdated: null,
      });
    case DOCUMENT_SAVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: action.didInvalidate,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function documentHelper(state = { }, action) {
  switch (action.type) {
    case REQUEST_DOCUMENT:
    case RECEIVE_DOCUMENT:
    case SAVING_DOCUMENT:
    case DOCUMENT_SAVED:
      return document(state.document, action);
    default:
      return state;
  }
}
