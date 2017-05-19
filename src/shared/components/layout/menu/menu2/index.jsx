/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors';

import SchoolContainer from '../../../../containers/school';
import { selectLocation } from '../../../../actions/location';

const style = require('./style.scss');

class Menu2 extends Component {

  constructor(args) {
    super(args);
    this.locationClickHandler = this.locationClickHandler.bind(this);
    this.menuClickHandler = this.menuClickHandler.bind(this);
  }

  getLocationsMenu(data) {
    const locationsEl = data.map(item => (<MenuItem key={item.id}>
      <Link to={`/location/${item.id}`} title={item.name} className={style.anchor} onClick={this.locationClickHandler} data-location-id={item.id}>
        {item.name}
      </Link>
    </MenuItem>));
    return (<IconMenu iconButtonElement={<IconButton><MoreVertIcon color={white} /></IconButton>}>
      {locationsEl}
    </IconMenu>);
  }

  locationClickHandler(e) {
    const { dispatch } = this.props;
    const locationId = $(e.target).data('location-id');
    dispatch(selectLocation(locationId));
  }

  menuClickHandler() {
    const { selectedLocation, locations } = this.props;
    console.log('titleClick', 'selectedLocation', selectedLocation, 'locations', locations);
    if (selectedLocation) {
      browserHistory.push(`/location/${selectedLocation}`);
    } else if (_.isArray(locations) && locations.length) {
      const locationId = locations[0].id;
      browserHistory.push(`/location/${locationId}`);
    }
  }

  render() {
    const { locations, isFetching, selectedLocation } = this.props;
    console.log('Menu2 isFetching', isFetching, !!selectedLocation);
    return (<AppBar
      title="Koolbe Admin App"
      onLeftIconButtonTouchTap={this.menuClickHandler}
      iconElementRight={this.getLocationsMenu(locations)}
    />);
  }
}

Menu2.propTypes = {
  selectedLocation: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Menu2.defaultProps = {
  selectedLocation: null,
};

export default SchoolContainer(Menu2);
