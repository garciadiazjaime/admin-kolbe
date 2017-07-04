export const SELECT_LEVEL = 'SELECT_LEVEL';

export function selectLevel(levelId) {
  return {
    type: SELECT_LEVEL,
    levelId,
  };
}
