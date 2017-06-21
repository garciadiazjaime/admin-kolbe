/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';

export default class ActivityForm extends Component {

  constructor(args) {
    super(args);
    const { parent } = this.props;
    this.state = {
      data: parent || {},
      valid: {},
      touch: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.invalidText = 'Obligatorio';
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
    const requiredFields = ['name', 'email', 'code'];
    let isReady = true;
    requiredFields.map((key) => {
      if (isReady && !data[key]) {
        isReady = false;
      }
      // when user clicks button we show required fields
      if (!newState.touch[key]) {
        newState.touch[key] = true;
      }
      newState.valid[key] = !!data[key];
      return null;
    });
    if (!isReady) {
      this.setState(newState);
    } else {
      this.props.action(data);
    }
  }

  render() {
    const { isProcessing, groupId } = this.props;
    const { data, valid, touch } = this.state;
    return (<div>
      <Link to={`/group/${groupId}/parent`} className="pull-right">
        <ContentClear />
      </Link>
      <TextField name="name" floatingLabelText="Nombre" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.name && touch.name ? this.invalidText : null} defaultValue={data.name} />
      <br />
      <span>{data.file}</span>
      <br />
      <TextField name="email" floatingLabelText="Email" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.email && touch.email ? this.invalidText : null} defaultValue={data.email} />
      <br />
      <TextField name="code" floatingLabelText="Código" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.code && touch.code ? this.invalidText : null} defaultValue={data.code} />
      <br />
      <RaisedButton label="Guardar" primary fullWidth onTouchTap={this.handleSubmit} />
      <br />
      { isProcessing ? <LinearProgress mode="indeterminate" /> : null }
    </div>);
  }
}

ActivityForm.propTypes = {
  isProcessing: PropTypes.bool,
  parent: PropTypes.shape({}),
  action: PropTypes.func.isRequired,
  groupId: PropTypes.string,
};

ActivityForm.defaultProps = {
  isProcessing: null,
  parent: {},
  groupId: null,
};
