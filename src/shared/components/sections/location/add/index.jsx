/* eslint max-len: [2, 500, 4] */
import React from 'react';
import LocationController from '../../../../../client/controllers/locationController';
import LocationForm from '../form';

export default class LocationAdd extends React.Component {

  constructor() {
    super();
    this.controller = new LocationController();
    this.submitAction = this.submitAction.bind(this);
  }

  submitAction(data) {
    return this.controller.save(data);
  }

  render() {
    return (<LocationForm submitAction={this.submitAction} />);
  }
}
