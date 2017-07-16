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
import { checkFields, getErrorText, setField } from '../../../utils/formUtil';
import { getUserRoute } from '../../../utils/routeUtil';
import style from './style.scss';

class LoginSection extends Component {

  constructor(args) {
    super(args);
    this.state = {
      data: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (!_.isEmpty(user) && user.id) {
      const route = getUserRoute(user);
      if (route) {
        browserHistory.push(`/${route}/${user.id}`);
      } else {
        browserHistory.push('/login?message=invalid_role');
      }
    }
  }

  handleInputChange(event) {
    const { data } = this.state;
    this.setState({
      data: setField(event, data),
    });
  }

  handleSubmit() {
    const { data } = this.state;
    const response = checkFields(['username', 'password'], data);

    if (!response.isValid) {
      this.setState({
        data: response.newData,
      });
    } else {
      const { dispatch } = this.props;
      dispatch(login(data.username.value, data.password.value));
    }
  }

  render() {
    const { isProcessing, error, didInvalidate } = this.props;
    const { data } = this.state;
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
          errorText={getErrorText('username', data)}
        />
        <TextField
          name="password"
          floatingLabelText="Contraseña"
          floatingLabelFixed
          fullWidth
          type="password"
          onChange={this.handleInputChange}
          errorText={getErrorText('password', data)}
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
