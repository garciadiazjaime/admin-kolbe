import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const SELECT_STUDENT = 'SELECT_STUDENT';
export const REQUEST_STUDENT = 'REQUEST_STUDENT';
export const RECEIVE_STUDENT = 'RECEIVE_STUDENT';
export const SAVING_STUDENT = 'SAVING_STUDENT';
export const STUDENT_SAVED = 'STUDENT_SAVED';

export function selectStudent(studentId) {
  return {
    type: SELECT_STUDENT,
    studentId,
  };
}

function requestStudent() {
  return {
    type: REQUEST_STUDENT,
  };
}

function receiveStudent(data) {
  return {
    type: RECEIVE_STUDENT,
    student: data.entity.data,
    receivedAt: Date.now(),
  };
}

function savingStudent() {
  return {
    type: SAVING_STUDENT,
  };
}

function studentSaved(groupId) {
  return {
    type: STUDENT_SAVED,
    receivedAt: Date.now(),
    groupId,
  };
}

function getStudentHelper(studentId) {
  return (dispatch) => {
    dispatch(requestStudent());
    return RequestUtil.get(`${constants.apiUrl}/student/${studentId}`)
      .then(response => dispatch(receiveStudent(response)));
  };
}

function saveStudentHelper(groupId, data) {
  return (dispatch) => {
    dispatch(savingStudent());
    return RequestUtil.post(`${constants.apiUrl}/group/${groupId}/student`, data)
      .then(() => dispatch(studentSaved(groupId)));
  };
}

function updateStudentHelper(studentId, data) {
  return (dispatch) => {
    dispatch(savingStudent());
    return RequestUtil.put(`${constants.apiUrl}/student/${studentId}`, data)
      .then(() => dispatch(studentSaved(data.groupId)));
  };
}

function shouldProccessStudent(state) {
  const student = state.studentHelper;
  return student.isProcessing !== true;
}

export function getStudent(studentId) {
  return (dispatch, getState) => {
    if (shouldProccessStudent(getState())) {
      return dispatch(getStudentHelper(studentId));
    }
    return null;
  };
}

export function saveStudent(groupId, data) {
  return (dispatch, getState) => {
    if (shouldProccessStudent(getState())) {
      return dispatch(saveStudentHelper(groupId, data));
    }
    return null;
  };
}

export function updateStudent(studentId, data) {
  return (dispatch, getState) => {
    if (shouldProccessStudent(getState())) {
      return dispatch(updateStudentHelper(studentId, data));
    }
    return null;
  };
}
