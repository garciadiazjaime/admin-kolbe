/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React from 'react';
import _ from 'lodash';
import LocationController from '../../../../../client/controllers/locationController';
import LocationList from './index';
import LogUtil from '../../../../utils/logUtil';

export default class LocationListContainer extends React.Component {

  constructor() {
    super();
    this.controller = new LocationController();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.controller.list()
      .then((results) => {
        if (results.entity.status) {
          this.setState({
            data: _.isArray(results.entity.data) ? results.entity.data : [],
          });
        }
      })
      .catch(error => LogUtil.log(error));
  }

  render() {
    return (<LocationList data={this.state.data} />);
  }
}
