import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES';
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';


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

function fetchActivities(groupId) {
  return (dispatch) => {
    dispatch(requestActivities(groupId));
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/activity`)
      .then(response => dispatch(receiveActivities(groupId, response)));
  };
}

function shouldFetchActivities(state, groupId) {
  const activities = state.activitiesByGroup[groupId];
  if (!activities) {
    return true;
  } else if (activities.isFetching) {
    return false;
  }
  return activities.didInvalidate;
}

export function fetchActivitiesAction(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchActivities(getState(), groupId)) {
      return dispatch(fetchActivities(groupId));
    }
    return null;
  };
}
