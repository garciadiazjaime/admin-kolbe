/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import {
  REQUEST_NEWSLETTERS,
  RECEIVE_NEWSLETTERS,
  DELETING_NEWSLETTER,
  NEWSLETTER_DELETED,
} from '../../actions/newsletter/list';

function removeEntity(data, entityId) {
  return data ? data.filter(item => item._id !== entityId) : data;
}

function newsletter(state = {
  isFetching: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_NEWSLETTERS:
    case DELETING_NEWSLETTER:
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
    case NEWSLETTER_DELETED:
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

export function newslettersByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_NEWSLETTERS:
    case RECEIVE_NEWSLETTERS:
    case DELETING_NEWSLETTER:
    case NEWSLETTER_DELETED:
      return Object.assign({}, state, {
        [action.groupId]: newsletter(state[action.groupId], action),
      });
    default:
      return state;
  }
}
