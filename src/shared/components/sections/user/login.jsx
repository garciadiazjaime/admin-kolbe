import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';

import UserLoginContainer from '../../../containers/user/login';
import constants from '../../../../constants';
import { login } from '../../../actions/user';
import StoreUtil from '../../../utils/storeUtil';
import style from './style.scss';

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
      const routes = constants.roleRoute;
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
    const { isProcessing, error, didInvalidate } = this.props;
    const { valid, touch } = this.state;
    return (<div>
      <AppBar title={constants.appTitle} showMenuIconButton={false} className={style.background} />
      { isProcessing ? <LinearProgress mode="indeterminate" /> : null }
      <div className="container">
        <TextField
          name="username"
          floatingLabelText="Correo"
          floatingLabelFixed
          fullWidth
          type="email"
          onChange={this.handleInputChange}
          errorText={!valid.username && touch.username ? this.invalidText : null}
        />
        <TextField
          name="password"
          floatingLabelText="Contraseña"
          floatingLabelFixed
          fullWidth
          type="password"
          onChange={this.handleInputChange}
          errorText={!valid.password && touch.password ? this.invalidText : null}
        />
        <RaisedButton
          label="Ingresar"
          primary
          className="pull-right"
          onTouchTap={this.handleSubmit}
        />
        <Subheader>
          { error }
          { didInvalidate ? constants.invalidLogin : null }
        </Subheader>
      </div>
    </div>);
  }
}

LoginSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  user: PropTypes.shape({}),
  error: PropTypes.string,
  didInvalidate: PropTypes.bool,
};

LoginSection.defaultProps = {
  isProcessing: null,
  user: {},
  error: null,
  didInvalidate: null,
};

export default UserLoginContainer(LoginSection);
