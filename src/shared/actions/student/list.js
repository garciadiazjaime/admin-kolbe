import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_STUDENTS_BY_PARENT = 'REQUEST_STUDENTS_BY_PARENT';
export const RECEIVE_STUDENTS_BY_PARENT = 'RECEIVE_STUDENTS_BY_PARENT';
export const REQUEST_STUDENTS_BY_GROUP = 'REQUEST_STUDENTS_BY_GROUP';
export const RECEIVE_STUDENTS_BY_GROUP = 'RECEIVE_STUDENTS_BY_GROUP';


function requestStudentsByParent(parentId) {
  return {
    type: REQUEST_STUDENTS_BY_PARENT,
    parentId,
  };
}

function receiveStudentsByParent(parentId, data) {
  return {
    type: RECEIVE_STUDENTS_BY_PARENT,
    parentId,
    students: data.entity.data,
    receivedAt: Date.now(),
  };
}

function getStudentsByParentHelper(parentId) {
  return (dispatch) => {
    dispatch(requestStudentsByParent(parentId));
    return RequestUtil.get(`${constants.apiUrl}/parent/${parentId}/student`)
      .then(response => dispatch(receiveStudentsByParent(parentId, response)));
  };
}

function shouldFetchStudentsByParent(state, parentId) {
  const students = state.studentsByParent[parentId] || {};
  return students.isFetching !== true;
}

export function getStudentsFromParent(parentId) {
  return (dispatch, getState) => {
    if (shouldFetchStudentsByParent(getState(), parentId)) {
      return dispatch(getStudentsByParentHelper(parentId));
    }
    return null;
  };
}


function requestStudentsByGroup(groupId) {
  return {
    type: REQUEST_STUDENTS_BY_GROUP,
    groupId,
  };
}

function receiveStudentsByGroup(groupId, data) {
  return {
    type: RECEIVE_STUDENTS_BY_GROUP,
    groupId,
    students: data.entity.data,
    receivedAt: Date.now(),
  };
}


function getStudentsByGroupHelper(groupId) {
  return (dispatch) => {
    dispatch(requestStudentsByGroup(groupId));
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/student`)
      .then(response => dispatch(receiveStudentsByGroup(groupId, response)));
  };
}

function shouldFetchStudentsByGroup(state, groupId) {
  const students = state.studentsByGroup[groupId] || {};
  return students.isFetching !== true;
}

export function getStudentsFromGroup(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchStudentsByGroup(getState(), groupId)) {
      return dispatch(getStudentsByGroupHelper(groupId));
    }
    return null;
  };
}
