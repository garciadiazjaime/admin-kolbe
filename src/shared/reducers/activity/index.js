import {
  SAVING_ACTIVITY,
  ACTIVITY_SAVED,
  REQUEST_ACTIVITY,
  ACTIVITY_RECEIVED,
} from '../../actions/activity';


function activity(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case REQUEST_ACTIVITY:
    case SAVING_ACTIVITY:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case ACTIVITY_RECEIVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.activity,
      });
    case ACTIVITY_SAVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        groupId: action.groupId,
      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function activityHelper(state = { }, action) {
  switch (action.type) {
    case REQUEST_ACTIVITY:
    case ACTIVITY_RECEIVED:
    case SAVING_ACTIVITY:
    case ACTIVITY_SAVED:
      return activity(state.activity, action);
    default:
      return state;
  }
}
