/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors';

import SchoolContainer from '../../../../containers/school';
import { selectLocation } from '../../../../actions/location';

const style = require('./style.scss');

class Menu2 extends Component {

  static getMainMenu(selectedLocation) {
    const items = [{
      title: 'Actividades',
      href: 'activity',
      id: 1,
    }, {
      title: 'Documentos',
      href: 'document',
      id: 2,
    }, {
      title: 'Boletines',
      href: 'newsletter',
      id: 3,
    }, {
      title: 'Padres',
      href: 'parent',
      id: 4,
    }];
    if (!selectedLocation) {
      return null;
    }
    const itemsEl = items.map(item => (<MenuItem key={item.id}>
      <Link to={`/location/${selectedLocation}/${item.href}`} title={item.title} className={style.anchor}>{item.title}</Link>
    </MenuItem>));
    return (<IconMenu iconButtonElement={<IconButton><MenuIcon color={white} /></IconButton>}>
      {itemsEl}
    </IconMenu>);
  }

  constructor(args) {
    super(args);
    this.locationClickHandler = this.locationClickHandler.bind(this);
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

  render() {
    const { locations, isFetching, lastUpdated, selectedLocation } = this.props;
    console.log('isFetching', isFetching, 'lastUpdated', lastUpdated, 'locations', locations, 'selectedLocation', selectedLocation);
    return (<AppBar
      title="Koolbe Admin App"
      iconElementLeft={Menu2.getMainMenu(selectedLocation)}
      showMenuIconButton={!!selectedLocation}
      iconElementRight={this.getLocationsMenu(locations)}
    />);
  }
}

Menu2.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  selectedLocation: PropTypes.string,
};

Menu2.defaultProps = {
  lastUpdated: null,
  selectedLocation: '',
};

export default SchoolContainer(Menu2);
