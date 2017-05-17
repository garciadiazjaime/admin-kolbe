import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';


function requestStudents(entityId) {
  return {
    type: REQUEST_STUDENTS,
    entityId,
  };
}

function receiveStudents(entityId, data) {
  return {
    type: RECEIVE_STUDENTS,
    entityId,
    students: data.entity.data,
    receivedAt: Date.now(),
  };
}

function getStudentsHelper(entityId, route) {
  return (dispatch) => {
    dispatch(requestStudents(entityId));
    return RequestUtil.get(`${constants.apiUrl}/${route}/${entityId}/student`)
      .then(response => dispatch(receiveStudents(entityId, response)));
  };
}

function shouldFetchStudents(state, entityId) {
  const students = state.studentsByEntity[entityId] || {};
  return students.isFetching !== true;
}

export function getStudents(params) {
  return (dispatch, getState) => {
    const { parentId, groupId } = params;
    if (shouldFetchStudents(getState(), parentId)) {
      return parentId ? dispatch(getStudentsHelper(parentId, 'parent')) :
        dispatch(getStudentsHelper(groupId, 'group'));
    }
    return null;
  };
}
