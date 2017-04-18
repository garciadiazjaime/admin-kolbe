import fetch from 'isomorphic-fetch';

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

function receiveSchool(schoolId, json) {
  return {
    type: RECEIVE_SCHOOL,
    schoolId,
    school: json.data,
    receivedAt: Date.now(),
  };
}

function fetchSchool(schoolId) {
  return (dispatch) => {
    dispatch(requestSchool(schoolId));
    return fetch(`http://127.0.0.1:3000/api/school/${schoolId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSchool(schoolId, json)));
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
