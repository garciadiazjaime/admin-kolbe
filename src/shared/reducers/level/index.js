import { SELECT_LEVEL } from '../../actions/level';

export function selectedLevel(state = '', action) {
  switch (action.type) {
    case SELECT_LEVEL:
      return action.levelId;
    default:
      return state;
  }
}

export const TEST = 'TEST';
