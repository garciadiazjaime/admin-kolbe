import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_ACTIVITY = 'REQUEST_ACTIVITY';
export const ACTIVITY_RECEIVED = 'ACTIVITY_RECEIVED';
export const SAVING_ACTIVITY = 'SAVING_ACTIVITY';
export const ACTIVITY_SAVED = 'ACTIVITY_SAVED';

function requestActivity() {
  return {
    type: REQUEST_ACTIVITY,
  };
}

function activityReceived(data) {
  return {
    type: ACTIVITY_RECEIVED,
    activity: data.entity.data,
    receivedAt: Date.now(),
  };
}

function savingActivity() {
  return {
    type: SAVING_ACTIVITY,
  };
}

function activitySaved(groupId) {
  return {
    type: ACTIVITY_SAVED,
    receivedAt: Date.now(),
    groupId,
  };
}

function getActivityHelper(groupId, activityId) {
  return (dispatch) => {
    dispatch(requestActivity());
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/activity/${activityId}`)
      .then(response => dispatch(activityReceived(response)));
  };
}

function saveActivityHelper(groupId, data) {
  return (dispatch) => {
    dispatch(savingActivity());
    return RequestUtil.post(`${constants.apiUrl}/group/${groupId}/activity`, data)
      .then(() => dispatch(activitySaved(groupId)));
  };
}

function updateActivityHelper(groupId, activityId, data) {
  return (dispatch) => {
    dispatch(savingActivity());
    return RequestUtil.put(`${constants.apiUrl}/group/${groupId}/activity/${activityId}`, data)
      .then(() => dispatch(activitySaved(data.groupId)));
  };
}

function shouldProccessActivity(state) {
  const activity = state.activityHelper;
  return activity.isProcessing !== true;
}

export function getActivity(groupId, activityId) {
  return (dispatch, getState) => {
    if (shouldProccessActivity(getState())) {
      return dispatch(getActivityHelper(groupId, activityId));
    }
    return null;
  };
}

export function saveActivity(groupId, data) {
  return (dispatch, getState) => {
    if (shouldProccessActivity(getState())) {
      return dispatch(saveActivityHelper(groupId, data));
    }
    return null;
  };
}

export function updateActivity(groupId, activityId, data) {
  return (dispatch, getState) => {
    if (shouldProccessActivity(getState())) {
      return dispatch(updateActivityHelper(groupId, activityId, data));
    }
    return null;
  };
}
