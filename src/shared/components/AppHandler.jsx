import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import GaUtil from '../utils/gaUtil';
import MainMenu from './layout/menu/mainMenu';
import { selectSchool, fetchSchoolIfNeeded } from '../actions/school';
import { selectLocation } from '../actions/location';
import { selectParent } from '../actions/parent';
import SchoolContainer from '../containers/school';
import constants from '../../constants';

injectTapEventPlugin();

class AppHandler extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    GaUtil.init();
    dispatch(selectSchool(constants.schoolId));
    dispatch(fetchSchoolIfNeeded(constants.schoolId));
  }

  componentWillReceiveProps(nextProps) {
    const { selectedLocation, selectedParent, locationByGroup, params, dispatch } = nextProps;
    const newLocation = locationByGroup[params.groupId];

    if (!selectedLocation && params.groupId && newLocation) {
      dispatch(selectLocation(locationByGroup[params.groupId]));
    }
    if (params.parentId && (!selectedParent || selectedParent !== params.parentId)) {
      dispatch(selectParent(params.parentId));
    }
  }

  render() {
    const { params, groupById } = this.props;

    return (<div>
      <MainMenu locationId={params.locationId} groupId={params.groupId} groupById={groupById} />
      {this.props.children}
    </div>);
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
};

AppHandler.defaultProps = {
  params: {},
  locationByGroup: {},
  selectedLocation: null,
  selectedParent: null,
  groupById: {},
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
};

export default SchoolContainer(AppHandler);
