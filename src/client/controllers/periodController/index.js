/* eslint max-len: [2, 500, 4] */
import RequestUtil from '../../../shared/utils/requestUtil';
import constants from '../../../shared/config/constants';

export default class PeriodController {

  constructor(locationId) {
    this.apiUrl = `${constants.baseUrl}api/location/${locationId}/period`;
  }

  list() {
    return RequestUtil.get(this.apiUrl);
  }

  get(locationId) {
    return RequestUtil.get(`${this.apiUrl}/${locationId}`);
  }

  update(locationId, data) {
    return RequestUtil.put(`${this.apiUrl}/${locationId}`, data);
  }
}
