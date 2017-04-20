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
    const locationsEl = data.map(item => (<MenuItem key={item.id}>
      <Link to={`/location/${item.id}`} title={item.name} className={style.anchor}>{item.name}</Link>
    </MenuItem>));
    return (<IconMenu iconButtonElement={<IconButton><MoreVertIcon color={white} /></IconButton>}>
      {locationsEl}
    </IconMenu>);
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
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};

Menu2.defaultProps = {
  lastUpdated: null,
};

export default SchoolContainer(Menu2);
