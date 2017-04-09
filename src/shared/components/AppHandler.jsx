import React, { PropTypes } from 'react';

import sitemap from '../config/sitemap';
import MainMenu from './layout/menu/menu1';
import Footer from './layout/footer/footer1';
import GaUtil from '../utils/gaUtil';

export default class AppHandler extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: context.data ? context.data : window.data,
    };
  }

  componentDidMount() {
    GaUtil.init();
  }

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { data: this.state.data }),
    );

    return (<div>
      <MainMenu items={sitemap.items.children} />
      {children}
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
