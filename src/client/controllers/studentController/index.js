/* eslint max-len: [2, 500, 4] */
import RequestUtil from '../../../shared/utils/requestUtil';
import constants from '../../../shared/config/constants';

export default class StudentController {

  constructor(locationId, periodId, gradeId, groupId) {
    this.apiUrl = `${constants.baseUrl}api/location/${locationId}/period/${periodId}/grade/${gradeId}/group/${groupId}/student`;
  }

  list() {
    return RequestUtil.get(this.apiUrl);
  }

  save(data) {
    return RequestUtil.post(`${this.apiUrl}`, data);
  }

  get(entityId) {
    return RequestUtil.get(`${this.apiUrl}/${entityId}`);
  }

  update(entityId, data) {
    return RequestUtil.put(`${this.apiUrl}/${entityId}`, data);
  }

  delete(entityId) {
    return RequestUtil.delete(`${this.apiUrl}/${entityId}`);
  }
}
