import { SELECT_GROUP } from '../../actions/group';


export function selectedGroup(state = '', action) {
  switch (action.type) {
    case SELECT_GROUP:
      return action.groupId;
    default:
      return state;
  }
}

export const TEST = 'TEST';
