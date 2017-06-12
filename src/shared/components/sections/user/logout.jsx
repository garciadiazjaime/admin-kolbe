import { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import StoreUtil from '../../../utils/storeUtil';
import { loggedUser } from '../../../actions/user';
import UserLoginContainer from '../../../containers/user/login';

class LogoutSection extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    StoreUtil.remove('token');
    dispatch(loggedUser(false));
    browserHistory.push('/login');
  }

  render() {
    return null;
  }
}

LogoutSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default UserLoginContainer(LogoutSection);
