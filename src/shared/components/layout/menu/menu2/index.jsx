import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import constants from '../../../../../constants';
import LocationContainer from '../../../../containers/location';

class Menu extends Component {

  constructor(args) {
    super(args);
    this.menuClickHandler = this.menuClickHandler.bind(this);
  }

  getTitle() {
    const { location } = this.props;
    const { groupById, groupId } = this.props;
    const title = [constants.appTitle];

    if (!_.isEmpty(location)) {
      title.push(location.name);
    }
    if (groupId && groupById[groupId]) {
      title.push(groupById[groupId]);
    }
    const separator = title.length > 1 ? ' | ' : '';
    return title.join(separator);
  }

  menuClickHandler() {
    const { selectedLocation, locationId } = this.props;
    const url = locationId ? '/' : `/location/${selectedLocation}`;
    browserHistory.push(url);
  }

  render() {
    return (<AppBar
      title={this.getTitle()}
      onLeftIconButtonTouchTap={this.menuClickHandler}
      iconElementRight={<FlatButton label="Salir" href="/logout" />}
    />);
  }
}

Menu.propTypes = {
  location: PropTypes.shape({}),
  selectedLocation: PropTypes.string,
  locationId: PropTypes.string,
  groupById: PropTypes.shape({}),
  groupId: PropTypes.string,
};

Menu.defaultProps = {
  location: {},
  selectedLocation: null,
  locationId: null,
  groupById: {},
  groupId: null,
};

export default LocationContainer(Menu);
