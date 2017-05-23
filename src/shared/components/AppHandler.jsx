import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import GaUtil from '../utils/gaUtil';
import Menu from './layout/menu/menu2';
import { selectSchool, fetchSchoolIfNeeded } from '../actions/school';
import { selectLocation } from '../actions/location';
import SchoolContainer from '../containers/school';
import constants from '../../constants';

injectTapEventPlugin();

class AppHandler extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: context.data ? context.data : window.data,
    };
    this.getChildren = this.getChildren.bind(this);
  }

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

  getChildren() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { data: this.state.data }),
    );
  }

  render() {
    const { params } = this.props;

    return (<div>
      <Menu locationId={params.locationId} groupId={params.groupId} />
      {this.getChildren()}
    </div>);
  }
}

AppHandler.propTypes = {
  children: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}),
  locationByGroup: PropTypes.shape({}),
  selectedLocation: PropTypes.string,
};

AppHandler.defaultProps = {
  params: {},
  locationByGroup: {},
  selectedLocation: null,
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
};

export default SchoolContainer(AppHandler);
