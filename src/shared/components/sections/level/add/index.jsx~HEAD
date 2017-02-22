/* eslint max-len: [2, 500, 4] */
import React from 'react';
import LevelController from '../../../../../client/controllers/levelController';
import Form from '../form';

export default class LevelAdd extends React.Component {

  constructor(args) {
    super(args);
    this.controller = new LevelController(this.props.params.locationId);
    this.submitAction = this.submitAction.bind(this);
  }

  submitAction(data) {
    return this.controller.save(data);
  }

  render() {
    return (<Form submitAction={this.submitAction} />);
  }
}

LevelAdd.propTypes = {
  params: React.PropTypes.shape({
    locationId: React.PropTypes.string.isRequired,
  }).isRequired,
};
