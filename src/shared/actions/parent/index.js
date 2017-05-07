import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_PARENT = 'REQUEST_PARENT';
export const RECEIVE_PARENT = 'RECEIVE_PARENT';
export const SAVING_PARENT = 'SAVING_PARENT';
export const PARENT_SAVED = 'PARENT_SAVED';

function requestParent() {
  return {
    type: REQUEST_PARENT,
  };
}

function receiveParent(data) {
  return {
    type: RECEIVE_PARENT,
    parent: data.entity.data,
    receivedAt: Date.now(),
  };
}

function savingParent() {
  return {
    type: SAVING_PARENT,
  };
}

function parentSaved(groupId) {
  return {
    type: PARENT_SAVED,
    receivedAt: Date.now(),
    groupId,
  };
}

function getParentHelper(parentId) {
  return (dispatch) => {
    dispatch(requestParent());
    return RequestUtil.get(`${constants.apiUrl}/parent/${parentId}`)
      .then(response => dispatch(receiveParent(response)));
  };
}

function saveParentHelper(groupId, data) {
  return (dispatch) => {
    dispatch(savingParent());
    return RequestUtil.post(`${constants.apiUrl}/group/${groupId}/parent`, data)
      .then(() => dispatch(parentSaved(groupId)));
  };
}

function updateParentHelper(parentId, data) {
  return (dispatch) => {
    dispatch(savingParent());
    return RequestUtil.put(`${constants.apiUrl}/parent/${parentId}`, data)
      .then(() => dispatch(parentSaved(data.groupId)));
  };
}

function shouldProccessParent(state) {
  const parent = state.parentHelper;
  return parent.isProcessing !== true;
}

export function getParent(parentId) {
  return (dispatch, getState) => {
    if (shouldProccessParent(getState())) {
      return dispatch(getParentHelper(parentId));
    }
    return null;
  };
}

export function saveParent(groupId, data) {
  return (dispatch, getState) => {
    if (shouldProccessParent(getState())) {
      return dispatch(saveParentHelper(groupId, data));
    }
    return null;
  };
}

export function updateParent(parentId, data) {
  return (dispatch, getState) => {
    if (shouldProccessParent(getState())) {
      return dispatch(updateParentHelper(parentId, data));
    }
    return null;
  };
}
