import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_SCHOOL = 'REQUEST_SCHOOL';
export const RECEIVE_SCHOOL = 'RECEIVE_SCHOOL';
export const SELECT_SCHOOL = 'SELECT_SCHOOL';
export const INVALIDATE_SCHOOL = 'INVALIDATE_SCHOOL';
export const UPLOADING_FILE = 'UPLOADING_FILE';
export const FILE_UPLOADED = 'FILE_UPLOADED';

export function selectSchool(schoolId) {
  return {
    type: SELECT_SCHOOL,
    schoolId,
  };
}

function uploadingFile() {
  return {
    type: UPLOADING_FILE,
  };
}

function fileUploaded() {
  return {
    type: FILE_UPLOADED,
    receivedAt: Date.now(),
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

function getSchoolHelper(schoolId) {
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

export function getSchool(schoolId) {
  return (dispatch, getState) => {
    if (shouldFetchSchool(getState(), schoolId)) {
      return dispatch(getSchoolHelper(schoolId));
    }
    return null;
  };
}

function uploadHelper(locationId, data) {
  return (dispatch) => {
    dispatch(uploadingFile());
    return RequestUtil.submit(`${constants.apiUrl}/location/${locationId}/upload`, data)
      .then(() => dispatch(fileUploaded()));
  };
}

function shouldProccessUpload(state) {
  const upload = state.groupUploadHelper;
  return upload.isProcessing !== true;
}

export function uploadDocument(locationId, data) {
  return (dispatch, getState) => {
    if (shouldProccessUpload(getState())) {
      return dispatch(uploadHelper(locationId, data));
    }
    return null;
  };
}
