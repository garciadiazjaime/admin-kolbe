import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import GaUtil from '../utils/gaUtil';
import MainMenu from './layout/menu/mainMenu';
import { selectSchool, getSchool } from '../actions/school';
import { selectLocation } from '../actions/location';
import { selectParent } from '../actions/parent';
import { loggedUser } from '../actions/user';
import SchoolContainer from '../containers/school';
import constants from '../../constants';
import AuthUtil from '../utils/authUtil';

injectTapEventPlugin();

class AppHandler extends Component {

  componentDidMount() {
    GaUtil.init();
    AuthUtil.isTokenValid().then((user) => {
      const { dispatch } = this.props;
      const routes = ['location', 'level', 'group', 'parent'];
      const route = routes[user.role];
      if (route) {
        dispatch(loggedUser(true));
        dispatch(selectSchool(constants.schoolId));
        dispatch(getSchool(constants.schoolId));
        browserHistory.push(`/${route}/${user.id}`);
      } else {
        browserHistory.push('/login?message=invalid_role');
      }
    })
    .catch(() => {
      browserHistory.push('/login');
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      selectedLocation,
      selectedParent,
      locationByGroup,
      params,
      dispatch,
    } = nextProps;
    const newLocation = locationByGroup[params.groupId];

    if (!selectedLocation && params.groupId && newLocation) {
      dispatch(selectLocation(locationByGroup[params.groupId]));
    }
    if (params.parentId && (!selectedParent || selectedParent !== params.parentId)) {
      dispatch(selectParent(params.parentId));
    }
  }

  render() {
    const { params, groupById, userLoggedIn } = this.props;

    return userLoggedIn ? (<div>
      <MainMenu locationId={params.locationId} groupId={params.groupId} groupById={groupById} />
      {this.props.children}
    </div>) : <div>
      loading
    </div>;
  }
}

AppHandler.propTypes = {
  children: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}),
  locationByGroup: PropTypes.shape({}),
  selectedLocation: PropTypes.string,
  selectedParent: PropTypes.string,
  groupById: PropTypes.shape({}),
  userLoggedIn: PropTypes.bool,
};

AppHandler.defaultProps = {
  params: {},
  locationByGroup: {},
  selectedLocation: null,
  selectedParent: null,
  groupById: {},
  userLoggedIn: false,
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
};

export default SchoolContainer(AppHandler);
