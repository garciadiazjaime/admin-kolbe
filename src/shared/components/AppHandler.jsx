import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import GaUtil from '../utils/gaUtil';
import Menu from './layout/menu/menu2';
import { selectSchool, fetchSchoolIfNeeded } from '../actions/school';
import { selectLocation } from '../actions/location';
import SchoolContainer from '../containers/school';
import constants from '../../constants';

injectTapEventPlugin();

// constructor(props, context) {
//   super(props, context);
//   this.state = {
//     data: context.data ? context.data : window.data,
//   };
//   this.getChildren = this.getChildren.bind(this);
// }

class AppHandler extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    GaUtil.init();
    dispatch(selectSchool(constants.schoolId));
    dispatch(fetchSchoolIfNeeded(constants.schoolId));
  }

  componentWillReceiveProps(nextProps) {
    const { selectedLocation, locationByGroup, params, dispatch } = nextProps;
    const newLocation = locationByGroup[params.groupId];

    if (!selectedLocation && params.groupId && newLocation) {
      dispatch(selectLocation(locationByGroup[params.groupId]));
    }
  }

  // getChildren() {
  //   return React.Children.map(this.props.children, child =>
  //     React.cloneElement(child, { data: this.state.data }),
  //   );
  // }
  // {this.getChildren()}

  render() {
    const { params, groupById } = this.props;

    return (<div>
      <Menu locationId={params.locationId} groupId={params.groupId} groupById={groupById} />
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
  groupById: PropTypes.shape({}),
};

AppHandler.defaultProps = {
  params: {},
  locationByGroup: {},
  selectedLocation: null,
  groupById: {},
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
};

export default SchoolContainer(AppHandler);
