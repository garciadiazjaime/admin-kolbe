import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import sitemap from '../config/sitemap';
import Footer from './layout/footer/footer1';
import GaUtil from '../utils/gaUtil';
import Menu from './layout/menu/menu2';

injectTapEventPlugin();

export default class AppHandler extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: context.data ? context.data : window.data,
    };
    this.getChildren = this.getChildren.bind(this);
  }

  componentDidMount() {
    GaUtil.init();
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
};

AppHandler.contextTypes = {
  data: PropTypes.object,
};

AppHandler.defaultProps = {
  children: {},
};
