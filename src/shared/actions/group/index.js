export const SELECT_GROUP = 'SELECT_GROUP';

export function selectGroup(groupId) {
  return {
    type: SELECT_GROUP,
    groupId,
  };
}

export const TEST = 'TEST';
