import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import GaUtil from '../utils/gaUtil';
import Menu from './layout/menu/menu2';
import { selectSchool, fetchSchoolIfNeeded } from '../actions/school';
import { selectLocation } from '../actions/location';
import { selectGroup } from '../actions/group';
import SchoolContainer from '../containers/school';

const schoolId = '58fbde6f393b1b1bd8536b5a';
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
    const { dispatch, params } = this.props;
    GaUtil.init();
    dispatch(selectSchool(schoolId));
    dispatch(fetchSchoolIfNeeded(schoolId));
    if (params && params.locationId) {
      dispatch(selectLocation(params.locationId));
    }
    if (params && params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
  }

  getChildren() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { data: this.state.data }),
    );
  }

  render() {
    return (<div>
      <Menu />
      {this.getChildren()}
    </div>);
  }
}

AppHandler.propTypes = {
  children: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}),
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
  dispatch: {},
  params: {},
};

export default SchoolContainer(AppHandler);
