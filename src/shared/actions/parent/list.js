import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_PARENTS = 'REQUEST_PARENTS';
export const RECEIVE_PARENTS = 'RECEIVE_PARENTS';


function requestParents(groupId) {
  return {
    type: REQUEST_PARENTS,
    groupId,
  };
}

function receiveParents(groupId, data) {
  return {
    type: RECEIVE_PARENTS,
    groupId,
    parents: data.entity.data,
    receivedAt: Date.now(),
  };
}

function getParentsHelper(groupId) {
  return (dispatch) => {
    dispatch(requestParents(groupId));
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/parent`)
      .then(response => dispatch(receiveParents(groupId, response)));
  };
}

function shouldFetchParents(state, groupId) {
  const parents = state.parentsByGroup[groupId] || {};
  return parents.isFetching !== true;
}

export function getParents(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchParents(getState(), groupId)) {
      return dispatch(getParentsHelper(groupId));
    }
    return null;
  };
}
