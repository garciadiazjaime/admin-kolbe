import RequestUtil from '../../utils/requestUtil';

export const SAVING_ACTIVITY = 'SAVING_ACTIVITY';
export const ACTIVITY_SAVED = 'ACTIVITY_SAVED';

function savingActivity(groupId) {
  return {
    type: SAVING_ACTIVITY,
    groupId,
  };
}

function activitySaved(groupId, json) {
  return {
    type: ACTIVITY_SAVED,
    groupId,
    activity: json,
    receivedAt: Date.now(),
  };
}

function saveActivity(groupId, data) {
  return (dispatch) => {
    dispatch(savingActivity(groupId));
    const url = `http://127.0.0.1:3000/api/group/${groupId}/activity`;
    return RequestUtil.post(url, data)
      .then(response => dispatch(activitySaved(groupId, response)));
  };
}

function shouldSaveActivity(state) {
  const { activity } = state;
  if (!activity) {
    return true;
  } else if (activity.isSaving) {
    return false;
  }
  return activity.didInvalidate;
}

export default function saveActivityAction(groupId, data) {
  return (dispatch, getState) => {
    if (shouldSaveActivity(getState())) {
      return dispatch(saveActivity(groupId, data));
    }
    return null;
  };
}
