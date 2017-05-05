import { SAVING_ACTIVITY, ACTIVITY_SAVED, REQUEST_ACTIVITY, RECEIVE_ACTIVITY } from '../../actions/activity';


function activity(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case REQUEST_ACTIVITY:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_ACTIVITY:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.activity,
      });
    case SAVING_ACTIVITY:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
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
    case RECEIVE_ACTIVITY:
    case SAVING_ACTIVITY:
    case ACTIVITY_SAVED:
      return activity(state.activity, action);
    default:
      return state;
  }
}
