import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from 'material-ui/styles/colors';

export default class Menu2 extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('handleClick', e, this);
  }

  render() {
    const iconElementLeft = (<IconMenu
      iconButtonElement={<IconButton><MenuIcon color={white} /></IconButton>}
      onTouchTap={this.handleClick}
      onItemTouchTap={this.handleClick}
    >
      <MenuItem>
        <Link to="activity" title="Actividades">Actividades</Link>
      </MenuItem>
      <MenuItem>
        <Link to="document" title="Documentos">Documentos</Link>
      </MenuItem>
      <MenuItem>
        <Link to="newsletter" title="Boletines">Boletines</Link>
      </MenuItem>
      <MenuItem>
        <Link to="parent" title="Padres">Padres</Link>
      </MenuItem>
    </IconMenu>);

    const iconElementRight = (<IconMenu
      iconButtonElement={<IconButton><MoreVertIcon color={white} /></IconButton>}
      onTouchTap={this.handleClick}
      onItemTouchTap={this.handleClick}
    >
      <MenuItem>
        <Link to="/location/1" title="Santa Fé">Santa Fé</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/location/2" title="Otay">Otay</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/location/3" title="Presidentes">Presidentes</Link>
      </MenuItem>
    </IconMenu>);

    return (<AppBar
      title="Koolbe Admin App"
      iconElementLeft={iconElementLeft}
      iconElementRight={iconElementRight}
    />);
  }
}
