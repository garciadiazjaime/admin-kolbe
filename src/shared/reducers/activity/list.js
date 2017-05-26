/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import {
  REQUEST_ACTIVITIES,
  RECEIVE_ACTIVITIES,
  DELETING_ACTIVITY,
  ACTIVITY_DELETED,
} from '../../actions/activity/list';

function removeActivity(activities, activityId) {
  return activities ? activities.filter(item => item._id !== activityId) : activities;
}

function activity(state = {
  isProcessing: false,
  didInvalidate: false,
  data: [],
}, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
    case DELETING_ACTIVITY:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.activities,
        lastUpdated: action.receivedAt,
      });
    case ACTIVITY_DELETED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: removeActivity(state.data, action.activityId),
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function activitiesByGroup(state = { }, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
    case RECEIVE_ACTIVITIES:
    case DELETING_ACTIVITY:
    case ACTIVITY_DELETED:
      return Object.assign({}, state, {
        [action.groupId]: activity(state[action.groupId], action),
      });
    default:
      return state;
  }
}
