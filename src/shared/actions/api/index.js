
export const API_ERROR = 'API_ERROR';

export function apiError(location) {
  return {
    type: API_ERROR,
    location,
  };
}
