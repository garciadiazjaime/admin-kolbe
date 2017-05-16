import { SELECT_GROUP, UPLOADING_FILE, FILE_UPLOADED } from '../../actions/group';


export function selectedGroup(state = '', action) {
  switch (action.type) {
    case SELECT_GROUP:
      return action.groupId;
    default:
      return state;
  }
}

function upload(state = {
  isProcessing: false,
  didInvalidate: false,
}, action) {
  switch (action.type) {
    case UPLOADING_FILE:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case FILE_UPLOADED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export function groupUploadHelper(state = { }, action) {
  switch (action.type) {
    case UPLOADING_FILE:
    case FILE_UPLOADED:
      return upload(state, action);
    default:
      return state;
  }
}
