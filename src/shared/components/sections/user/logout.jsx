import { Component } from 'react';
import { browserHistory } from 'react-router';

import StoreUtil from '../../../utils/storeUtil';

class LogoutSection extends Component {

  componentWillMount() {
    StoreUtil.remove('token');
    browserHistory.push('/login');
  }

  render() {
    return null;
  }
}

export default LogoutSection;
