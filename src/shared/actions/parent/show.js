import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_GROUPS_BY_PARENT = 'REQUEST_GROUPS_BY_PARENT';
export const RECEIVE_GROUPS_BY_PARENT = 'RECEIVE_GROUPS_BY_PARENT';

function requestGroupsByParents(parentId) {
  return {
    type: REQUEST_GROUPS_BY_PARENT,
    parentId,
  };
}

function receiveGroupsByParent(parentId, data) {
  return {
    type: RECEIVE_GROUPS_BY_PARENT,
    parentId,
    groups: data.entity.data,
    receivedAt: Date.now(),
  };
}

function getGroupsByParentHelper(parentId) {
  return (dispatch) => {
    dispatch(requestGroupsByParents(parentId));
    return RequestUtil.get(`${constants.apiUrl}/parent/${parentId}/group`)
      .then(response => dispatch(receiveGroupsByParent(parentId, response)));
  };
}

function shouldFetchGroups(state, parentId) {
  const parent = state.groupsByParent[parentId] || {};
  return parent.isProcessing !== true;
}

export function getGroupsByParent(parentId) {
  return (dispatch, getState) => {
    if (shouldFetchGroups(getState(), parentId)) {
      return dispatch(getGroupsByParentHelper(parentId));
    }
    return null;
  };
}
