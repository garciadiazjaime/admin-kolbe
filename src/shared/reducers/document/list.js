/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import {
  REQUEST_DOCUMENTS,
  RECEIVE_DOCUMENTS,
  DELETING_DOCUMENT,
  DOCUMENT_DELETED,
} from '../../actions/document/list';

function removeEntity(data, entityId) {
  return data ? data.filter(item => item._id !== entityId) : data;
}

function document(state = {
  isProcessing: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_DOCUMENTS:
    case DELETING_DOCUMENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_DOCUMENTS:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.documents || [],
        lastUpdated: action.receivedAt,
      });
    case DOCUMENT_DELETED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: removeEntity(state.data, action.documentId),
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
    case DELETING_DOCUMENT:
    case DOCUMENT_DELETED:
      return Object.assign({}, state, {
        [action.groupId]: document(state[action.groupId], action),
      });
    default:
      return state;
  }
}
