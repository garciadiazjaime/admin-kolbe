/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

function menuClickHandler() {
  browserHistory.push('/');
}

function Menu() {
  return (<AppBar
    title="Koolbe Admin App"
    onLeftIconButtonTouchTap={menuClickHandler}
  />);
}

export default Menu;
