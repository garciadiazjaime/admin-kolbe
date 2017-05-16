import RequestUtil from '../../utils/requestUtil';
import constants from '../../../constants';

export const SELECT_GROUP = 'SELECT_GROUP';
export const UPLOADING_FILE = 'UPLOADING_FILE';
export const FILE_UPLOADED = 'FILE_UPLOADED';

export function selectGroup(groupId) {
  return {
    type: SELECT_GROUP,
    groupId,
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

function uploadHelper(groupId, data) {
  return (dispatch) => {
    dispatch(uploadingFile());
    return RequestUtil.submit(`${constants.apiUrl}/group/${groupId}/upload`, data)
      .then(() => dispatch(fileUploaded()));
  };
}

function shouldProccessUpload(state) {
  const upload = state.groupUploadHelper;
  return upload.isProcessing !== true;
}

export function uploadDocument(groupId, data) {
  return (dispatch, getState) => {
    if (shouldProccessUpload(getState())) {
      return dispatch(uploadHelper(groupId, data));
    }
    return null;
  };
}
