import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES';
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const DELETING_ACTIVITY = 'DELETING_ACTIVITY';
export const ACTIVITY_DELETED = 'ACTIVITY_DELETED';

function requestActivities(groupId) {
  return {
    type: REQUEST_ACTIVITIES,
    groupId,
  };
}

function receiveActivities(groupId, data) {
  return {
    type: RECEIVE_ACTIVITIES,
    groupId,
    activities: data.entity.data,
    receivedAt: Date.now(),
  };
}

function deletingActivity(groupId) {
  return {
    type: DELETING_ACTIVITY,
    groupId,
  };
}

function activityDeleted(groupId, activityId) {
  return {
    type: ACTIVITY_DELETED,
    receivedAt: Date.now(),
    groupId,
    activityId,
  };
}

function getActivitiesHelper(groupId) {
  return (dispatch) => {
    dispatch(requestActivities(groupId));
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/activity`)
      .then(response => dispatch(receiveActivities(groupId, response)));
  };
}

function shouldFetchActivities(state, groupId) {
  const activities = state.activitiesByGroup[groupId] || {};
  return activities.isProcessing !== true;
}

export function getActivities(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchActivities(getState(), groupId)) {
      return dispatch(getActivitiesHelper(groupId));
    }
    return null;
  };
}

function deleteActivityHelper(groupId, activityId) {
  return (dispatch) => {
    dispatch(deletingActivity(groupId));
    return RequestUtil.delete(`${constants.apiUrl}/activity/${activityId}`)
      .then(() => dispatch(activityDeleted(groupId, activityId)));
  };
}

export function deleteActivity(groupId, activityId) {
  return (dispatch, getState) => {
    if (shouldFetchActivities(getState(), groupId)) {
      return dispatch(deleteActivityHelper(groupId, activityId));
    }
    return null;
  };
}
