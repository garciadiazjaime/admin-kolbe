import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_PARENTS = 'REQUEST_PARENTS';
export const RECEIVE_PARENTS = 'RECEIVE_PARENTS';
export const DELETING_PARENT = 'DELETING_PARENT';
export const PARENT_DELETED = 'PARENT_DELETED';

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

function deletingParent(groupId) {
  return {
    type: DELETING_PARENT,
    groupId,
  };
}

function parentDeleted(groupId, entityId) {
  return {
    type: PARENT_DELETED,
    receivedAt: Date.now(),
    groupId,
    entityId,
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
  return parents.isProcessing !== true;
}

export function getParents(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchParents(getState(), groupId)) {
      return dispatch(getParentsHelper(groupId));
    }
    return null;
  };
}

function deleteParentHelper(groupId, entityId) {
  return (dispatch) => {
    dispatch(deletingParent(groupId));
    return RequestUtil.delete(`${constants.apiUrl}/group/${groupId}/parent/${entityId}`)
      .then(() => dispatch(parentDeleted(groupId, entityId)));
  };
}

export function deleteParent(groupId, entityId) {
  return (dispatch, getState) => {
    if (shouldFetchParents(getState(), groupId)) {
      return dispatch(deleteParentHelper(groupId, entityId));
    }
    return null;
  };
}
