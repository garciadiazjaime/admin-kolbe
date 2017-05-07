import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const REQUEST_DOCUMENT = 'REQUEST_DOCUMENT';
export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT';
export const SAVING_DOCUMENT = 'SAVING_DOCUMENT';
export const DOCUMENT_SAVED = 'DOCUMENT_SAVED';

function requestDocument() {
  return {
    type: REQUEST_DOCUMENT,
  };
}

function receiveDocument(data) {
  return {
    type: RECEIVE_DOCUMENT,
    document: data.entity.data,
    receivedAt: Date.now(),
  };
}

function savingDocument() {
  return {
    type: SAVING_DOCUMENT,
  };
}

function documentSaved(groupId) {
  return {
    type: DOCUMENT_SAVED,
    receivedAt: Date.now(),
    groupId,
  };
}

function getDocumentHelper(documentId) {
  return (dispatch) => {
    dispatch(requestDocument());
    return RequestUtil.get(`${constants.apiUrl}/document/${documentId}`)
      .then(response => dispatch(receiveDocument(response)));
  };
}

function saveDocumentHelper(groupId, data) {
  return (dispatch) => {
    dispatch(savingDocument());
    return RequestUtil.post(`${constants.apiUrl}/group/${groupId}/document`, data)
      .then(() => dispatch(documentSaved(groupId)));
  };
}

function updateDocumentHelper(documentId, data) {
  return (dispatch) => {
    dispatch(savingDocument());
    return RequestUtil.put(`${constants.apiUrl}/document/${documentId}`, data)
      .then(() => dispatch(documentSaved(data.groupId)));
  };
}

function shouldProccessDocument(state) {
  const document = state.documentHelper;
  return document.isProcessing !== true;
}

export function getDocument(documentId) {
  return (dispatch, getState) => {
    if (shouldProccessDocument(getState())) {
      return dispatch(getDocumentHelper(documentId));
    }
    return null;
  };
}

export function saveDocument(groupId, data) {
  return (dispatch, getState) => {
    if (shouldProccessDocument(getState())) {
      return dispatch(saveDocumentHelper(groupId, data));
    }
    return null;
  };
}

export function updateDocument(documentId, data) {
  return (dispatch, getState) => {
    if (shouldProccessDocument(getState())) {
      return dispatch(updateDocumentHelper(documentId, data));
    }
    return null;
  };
}
