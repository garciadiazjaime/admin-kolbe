import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

import constants from '../../../../../constants';
import LocationContainer from '../../../../containers/location';

class Menu extends Component {

  constructor(args) {
    super(args);
    this.menuClickHandler = this.menuClickHandler.bind(this);
  }

  menuClickHandler() {
    const { selectedLocation, locationId } = this.props;
    const url = selectedLocation && !locationId ? `/location/${selectedLocation}` : '/';
    browserHistory.push(url);
  }

  render() {
    return (<AppBar
      title={constants.appTitle}
      onLeftIconButtonTouchTap={this.menuClickHandler}
    />);
  }
}

Menu.propTypes = {
  selectedLocation: PropTypes.string,
  locationId: PropTypes.string,
};

Menu.defaultProps = {
  selectedLocation: null,
  locationId: null,
};

export default LocationContainer(Menu);
