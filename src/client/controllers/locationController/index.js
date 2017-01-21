/* eslint max-len: [2, 500, 4] */
// import _ from 'lodash';
import RequestUtil from '../../../shared/utils/requestUtil';

export default class LocationController {

  constructor() {
    const baseUrl = 'http://127.0.0.1:3000/';
    this.apiUrl = `${baseUrl}api/location`;
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
