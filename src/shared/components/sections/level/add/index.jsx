/* eslint max-len: [2, 500, 4] */
import React from 'react';
import PropTypes from 'prop-types';
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
  params: PropTypes.shape({
    locationId: PropTypes.string.isRequired,
  }).isRequired,
};
