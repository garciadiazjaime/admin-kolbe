import { SELECT_STUDENT, SAVING_STUDENT, STUDENT_SAVED, REQUEST_STUDENT, RECEIVE_STUDENT } from '../../actions/student';

export function selectedStudent(state = '', action) {
  switch (action.type) {
    case SELECT_STUDENT:
      return action.studentId;
    default:
      return state;
  }
}

function student(state = {
  isProcessing: false,
  didInvalidate: false,
  data: {},
}, action) {
  switch (action.type) {
    case REQUEST_STUDENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case RECEIVE_STUDENT:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        data: action.student,
      });
    case SAVING_STUDENT:
      return Object.assign({}, state, {
        isProcessing: true,
        didInvalidate: false,
      });
    case STUDENT_SAVED:
      return Object.assign({}, state, {
        isProcessing: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,

      });
    default:
      return state;
  }
}

export const TEST = 'TEST';

export function studentHelper(state = { }, action) {
  switch (action.type) {
    case REQUEST_STUDENT:
    case RECEIVE_STUDENT:
    case SAVING_STUDENT:
    case STUDENT_SAVED:
      return student(state.student, action);
    default:
      return state;
  }
}
