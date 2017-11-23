import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import constants from '../../../../../constants';
import LocationContainer from '../../../../containers/location';

import style from './style.scss';

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
    const {
      selectedRole,
      selectedLevel,
      selectedGroup,
      selectedParent,
      selectedLocation,
      selectedSchool,
    } = this.props;
    const routes = constants.roleRoute;
    const route = routes[selectedRole];
    let url = '/';

    if (selectedRole === 1) {
      url = `/${route}/${selectedLevel}`;
    } else if (selectedRole === 2) {
      url = `/${route}/${selectedGroup}`;
    } else if (selectedRole === 3) {
      url = `/${route}/${selectedParent}`;
    } else if (selectedRole === 4) {
      url = `/${route}/${selectedLocation}`;
    } else if (selectedRole === 5) {
      url = `/${route}/${selectedSchool}`;
    }
    browserHistory.push(url);
  }

  render() {
    return (<AppBar
      title={this.getTitle()}
      onLeftIconButtonTouchTap={this.menuClickHandler}
      iconElementRight={<FlatButton label="Salir" href="/logout" />}
      className={style.background}
      iconClassNameLeft={style.logo}
    />);
  }
}

Menu.propTypes = {
  location: PropTypes.shape({}),
  selectedLocation: PropTypes.string,
  groupById: PropTypes.shape({}),
  groupId: PropTypes.string,
  selectedParent: PropTypes.string,
  selectedGroup: PropTypes.string,
  selectedLevel: PropTypes.string,
  selectedRole: PropTypes.number,
  selectedSchool: PropTypes.string,
};

Menu.defaultProps = {
  location: {},
  selectedLocation: null,
  groupById: {},
  groupId: null,
  selectedParent: null,
  selectedGroup: null,
  selectedLevel: null,
  selectedRole: null,
  selectedSchool: null,
};

export default LocationContainer(Menu);
