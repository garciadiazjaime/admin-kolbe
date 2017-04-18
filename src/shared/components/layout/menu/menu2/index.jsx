/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors';

import LocationContainer from '../../../../containers/location/list';
import { fetchLocationsIfNeeded } from '../../../../actions/location/list';

const style = require('./style.scss');

class Menu2 extends Component {

  static getMainMenu() {
    const items = [{
      title: 'Actividades',
      href: '/activity',
      id: 1,
    }, {
      title: 'Documentos',
      href: '/document',
      id: 2,
    }, {
      title: 'Boletines',
      href: '/newsletter',
      id: 3,
    }, {
      title: 'Padres',
      href: '/parent',
      id: 4,
    }];
    const itemsEl = items.map(item => (<MenuItem key={item.id}>
      <Link to={item.href} title={item.title} className={style.anchor}>{item.title}</Link>
    </MenuItem>));
    return (<IconMenu iconButtonElement={<IconButton><MenuIcon color={white} /></IconButton>}>
      {itemsEl}
    </IconMenu>);
  }

  static getLocationsMenu(data) {
    const locationsEl = data.map(item => (<MenuItem key={item._id}>
      <Link to={`/location/${item._id}`} title={item.name} className={style.anchor}>{item.name}</Link>
    </MenuItem>));
    return (<IconMenu iconButtonElement={<IconButton><MoreVertIcon color={white} /></IconButton>}>
      {locationsEl}
    </IconMenu>);
  }

  componentDidMount() {
    const { dispatch, selectedSchool } = this.props;
    dispatch(fetchLocationsIfNeeded(selectedSchool));
  }

  render() {
    const { locations, isFetching, lastUpdated } = this.props;
    console.log('isFetching', isFetching, 'lastUpdated', lastUpdated, 'locations', locations);
    return (<AppBar
      title="Koolbe Admin App"
      iconElementLeft={Menu2.getMainMenu()}
      iconElementRight={Menu2.getLocationsMenu(locations)}
    />);
  }
}

Menu2.propTypes = {
  selectedSchool: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

Menu2.defaultProps = {
  dispatch: {},
  lastUpdated: null,
};

export default LocationContainer(Menu2);
