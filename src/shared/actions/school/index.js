import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_SCHOOL = 'REQUEST_SCHOOL';
export const RECEIVE_SCHOOL = 'RECEIVE_SCHOOL';
export const SELECT_SCHOOL = 'SELECT_SCHOOL';
export const INVALIDATE_SCHOOL = 'INVALIDATE_SCHOOL';

export function selectSchool(schoolId) {
  return {
    type: SELECT_SCHOOL,
    schoolId,
  };
}

export function invalidateSchool(schoolId) {
  return {
    type: INVALIDATE_SCHOOL,
    schoolId,
  };
}

function requestSchool(schoolId) {
  return {
    type: REQUEST_SCHOOL,
    schoolId,
  };
}

function receiveSchool(schoolId, data) {
  return {
    type: RECEIVE_SCHOOL,
    schoolId,
    school: data.entity.data,
    receivedAt: Date.now(),
  };
}

function fetchSchool(schoolId) {
  return (dispatch) => {
    dispatch(requestSchool(schoolId));
    return RequestUtil.get(`${constants.apiUrl}/school/${schoolId}`)
      .then(response => dispatch(receiveSchool(schoolId, response)));
  };
}

function shouldFetchSchool(state, schoolId) {
  const school = state.schoolById[schoolId];
  if (!school) {
    return true;
  } else if (school.isFetching) {
    return false;
  }
  return school.didInvalidate;
}

export function fetchSchoolIfNeeded(schoolId) {
  return (dispatch, getState) => {
    if (shouldFetchSchool(getState(), schoolId)) {
      return dispatch(fetchSchool(schoolId));
    }
    return null;
  };
}
