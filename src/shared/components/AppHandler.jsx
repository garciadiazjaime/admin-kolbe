import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import sitemap from '../config/sitemap';
import Footer from './layout/footer/footer1';
import GaUtil from '../utils/gaUtil';
import Menu from './layout/menu/menu2';
import { selectSchool, fetchSchoolIfNeeded } from '../actions/school';
import SchoolContainer from '../containers/school';

const schoolId = '58f3b39a3b44ad5880370db6';
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
    dispatch(selectSchool(schoolId));
    dispatch(fetchSchoolIfNeeded(schoolId));
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
      <Footer items={sitemap.items.children} />
    </div>);
  }
}

AppHandler.propTypes = {
  children: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
  dispatch: {},
};

export default SchoolContainer(AppHandler);
