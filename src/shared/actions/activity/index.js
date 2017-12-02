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

function activitySaved() {
  return {
    type: ACTIVITY_SAVED,
    receivedAt: Date.now(),
  };
}

function getActivityHelper(activityId) {
  return (dispatch) => {
    dispatch(requestActivity());
    return RequestUtil.get(`${constants.apiUrl}/activity/${activityId}`)
      .then(response => dispatch(activityReceived(response)));
  };
}

function saveActivityHelper(data) {
  return (dispatch) => {
    dispatch(savingActivity());
    return RequestUtil.post(`${constants.apiUrl}/activity`, data)
      .then(() => dispatch(activitySaved()));
  };
}

function updateActivityHelper(activityId, data) {
  return (dispatch) => {
    dispatch(savingActivity());
    return RequestUtil.put(`${constants.apiUrl}/activity/${activityId}`, data)
      .then(() => dispatch(activitySaved()));
  };
}

function shouldProccessActivity(state) {
  const activity = state.activityHelper;
  return activity.isProcessing !== true;
}

export function getActivity(activityId) {
  return (dispatch, getState) => {
    if (shouldProccessActivity(getState())) {
      return dispatch(getActivityHelper(activityId));
    }
    return null;
  };
}

export function saveActivity(data) {
  return (dispatch, getState) => {
    if (shouldProccessActivity(getState())) {
      return dispatch(saveActivityHelper(data));
    }
    return null;
  };
}

export function updateActivity(activityId, data) {
  return (dispatch, getState) => {
    if (shouldProccessActivity(getState())) {
      return dispatch(updateActivityHelper(activityId, data));
    }
    return null;
  };
}
