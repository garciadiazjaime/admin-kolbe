import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS';
export const RECEIVE_DOCUMENTS = 'RECEIVE_DOCUMENTS';


function requestDocuments(groupId) {
  return {
    type: REQUEST_DOCUMENTS,
    groupId,
  };
}

function receiveDocuments(groupId, data) {
  return {
    type: RECEIVE_DOCUMENTS,
    groupId,
    documents: data.entity.data,
    receivedAt: Date.now(),
  };
}

function getDocumentsHelper(groupId) {
  return (dispatch) => {
    dispatch(requestDocuments(groupId));
    return RequestUtil.get(`${constants.apiUrl}/group/${groupId}/document`)
      .then(response => dispatch(receiveDocuments(groupId, response)));
  };
}

function shouldFetchDocuments(state, groupId) {
  const documents = state.documentsByGroup[groupId] || {};
  return documents.isFetching !== true;
}

export function getDocuments(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchDocuments(getState(), groupId)) {
      return dispatch(getDocumentsHelper(groupId));
    }
    return null;
  };
}
