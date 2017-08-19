import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS';
export const RECEIVE_DOCUMENTS = 'RECEIVE_DOCUMENTS';
export const DELETING_DOCUMENT = 'DELETING_DOCUMENT';
export const DOCUMENT_DELETED = 'DOCUMENT_DELETED';

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

function deletingDocument(groupId) {
  return {
    type: DELETING_DOCUMENT,
    groupId,
  };
}

function documentDeleted(groupId, documentId) {
  return {
    type: DOCUMENT_DELETED,
    receivedAt: Date.now(),
    groupId,
    documentId,
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
  return documents.isProcessing !== true;
}

export function getDocuments(groupId) {
  return (dispatch, getState) => {
    if (shouldFetchDocuments(getState(), groupId)) {
      return dispatch(getDocumentsHelper(groupId));
    }
    return null;
  };
}

function deleteDocumentHelper(groupId, documentId) {
  return (dispatch) => {
    dispatch(deletingDocument(groupId));
    return RequestUtil.delete(`${constants.apiUrl}/group/${groupId}/document/${documentId}`)
      .then(() => dispatch(documentDeleted(groupId, documentId)));
  };
}

export function deleteDocument(groupId, documentId) {
  return (dispatch, getState) => {
    if (shouldFetchDocuments(getState(), groupId)) {
      return dispatch(deleteDocumentHelper(groupId, documentId));
    }
    return null;
  };
}
