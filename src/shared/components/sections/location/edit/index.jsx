/* eslint max-len: [2, 500, 4] */
import React from 'react';
import LocationController from '../../../../../client/controllers/locationController';
import LogUtil from '../../../../utils/logUtil';
import LocationForm from '../form';

export default class LocationEdit extends React.Component {

  constructor(args) {
    super(args);
    this.entityId = this.props.params.locationId;
    this.controller = new LocationController();
    this.submitAction = this.submitAction.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    if (this.entityId) {
      this.controller.get(this.entityId)
        .then((results) => {
          if (results.entity.status) {
            this.setState({
              data: results.entity.data,
            });
          }
        })
        .catch(error => LogUtil.log(error));
    } else {
      LogUtil.log(`[ERROR::LOADING] ${this.props.location.pathname}`);
    }
  }

  submitAction(data) {
    return this.controller.update(this.entityId, data);
  }

  deleteAction() {
    return this.controller.delete(this.entityId);
  }

  render() {
    return (<LocationForm params={this.props.params} location={this.props.location} data={this.state.data} submitAction={this.submitAction} deleteAction={this.deleteAction} />);
  }
}

LocationEdit.propTypes = {
  params: React.PropTypes.shape({
    locationId: React.PropTypes.string.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};
