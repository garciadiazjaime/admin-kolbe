import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import UserLoginContainer from '../../../containers/user/login';
import constants from '../../../../constants';
import { login } from '../../../actions/user';
import StoreUtil from '../../../utils/storeUtil';

class LoginSection extends Component {

  constructor(args) {
    super(args);
    this.state = {
      data: {},
      valid: {},
      touch: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.invalidText = constants.invalidText;
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (!_.isEmpty(user) && user.id) {
      StoreUtil.set('token', user.token);
      const routes = ['location', 'level', 'group', 'parent'];
      const route = routes[user.role];
      if (route) {
        browserHistory.push(`/${route}/${user.id}`);
      } else {
        browserHistory.push('/login?message=invalid_role');
      }
    }
  }

  handleInputChange(event) {
    if (event) {
      const newState = _.assign({}, this.state);
      const { name, value } = event.target;
      newState.data[name] = value;
      newState.valid[name] = !!value;
      if (!newState.touch[name]) {
        newState.touch[name] = true;
      }
      this.setState(newState);
    }
  }

  handleSubmit() {
    const { data } = this.state;
    const newState = _.assign({}, this.state);
    const requiredFields = ['username', 'password'];
    let isReady = true;

    requiredFields.forEach((key) => {
      if (isReady && !data[key]) {
        isReady = false;
      }
      // when user clicks button we show required fields
      if (!newState.touch[key]) {
        newState.touch[key] = true;
      }
      newState.valid[key] = !!data[key];
    });

    if (!isReady) {
      this.setState(newState);
    } else {
      const { dispatch } = this.props;
      dispatch(login(data.username, data.password));
    }
  }

  render() {
    const { isProcessing } = this.props;
    const { valid, touch } = this.state;
    return (<div>
      <AppBar title={constants.appTitle} showMenuIconButton={false} />
      <div className="container">
        <TextField
          name="username"
          floatingLabelText="Email"
          floatingLabelFixed
          fullWidth
          type="email"
          onChange={this.handleInputChange}
          errorText={!valid.username && touch.username ? this.invalidText : null}
        />
        <TextField
          name="password"
          floatingLabelText="Password"
          floatingLabelFixed
          fullWidth
          type="password"
          onChange={this.handleInputChange}
          errorText={!valid.password && touch.password ? this.invalidText : null}
        />
        <RaisedButton label="Login" primary className="pull-right" onTouchTap={this.handleSubmit} />
        { isProcessing ? <LinearProgress mode="indeterminate" /> : null }
      </div>
    </div>);
  }
}

LoginSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  user: PropTypes.shape({}),
};

LoginSection.defaultProps = {
  isProcessing: null,
  user: {},
};

export default UserLoginContainer(LoginSection);
