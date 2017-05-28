/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import {
  REQUEST_PARENTS,
  RECEIVE_PARENTS,
  DELETING_PARENT,
  PARENT_DELETED,
} from '../../actions/parent/list';

function removeEntity(data, entityId) {
  return data ? data.filter(item => item._id !== entityId) : data;
}

function parent(state = {
  isProcessing: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_PARENTS:
    case DELETING_PARENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_PARENTS:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.parents,
        lastUpdated: action.receivedAt,
      });
    case PARENT_DELETED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: removeEntity(state.data, action.entityId),
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
    case DELETING_PARENT:
    case PARENT_DELETED:
      return Object.assign({}, state, {
        [action.groupId]: parent(state[action.groupId], action),
      });
    default:
      return state;
  }
}
