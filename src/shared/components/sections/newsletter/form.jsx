/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';

export default class ActivityForm extends Component {

  constructor(args) {
    super(args);
    const { groupId, newsletter } = this.props;
    const initData = _.isEmpty(newsletter) ? {
      date: new Date(),
      groupId,
    } : newsletter;
    this.state = {
      data: initData,
      valid: {},
      touch: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.invalidText = 'Obligatorio';
  }

  handleInputChange(event, newDate) {
    const newState = _.assign({}, this.state);
    if (event) {
      const { name, value } = event.target;
      newState.data[name] = value;
      newState.valid[name] = !!value;
      if (!newState.touch[name]) {
        newState.touch[name] = true;
      }
    } else if (newDate) {
      newState.data.date = newDate;
    }

    this.setState(newState);
  }

  handleSubmit() {
    const { data } = this.state;
    const newState = _.assign({}, this.state);
    const requiredFields = ['name', 'description'];
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
    const { isProcessing, groupId, title } = this.props;
    const { data, valid, touch } = this.state;
    return (<div>
      <Link to={`/group/${groupId}/newsletter`} className="pull-right">
        <ContentClear />
      </Link>
      <div className="clearfix" />
      <Subheader>{title}</Subheader>
      <TextField name="name" floatingLabelText="Nombre" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.name && touch.name ? this.invalidText : null} defaultValue={data.name} />
      <br />
      <span>{data.file}</span>
      <br />
      <TextField name="description" floatingLabelText="Descripción" floatingLabelFixed multiLine rows={4} fullWidth onChange={this.handleInputChange} errorText={!valid.description && touch.description ? this.invalidText : null} defaultValue={data.description} />
      <br />
      <DatePicker name="date" floatingLabelText="Fecha" fullWidth onChange={this.handleInputChange} autoOk defaultDate={new Date(data.date)} />
      <br />
      <RaisedButton label="Guardar" primary fullWidth onTouchTap={this.handleSubmit} />
      <br />
      { isProcessing ? <LinearProgress mode="indeterminate" /> : null }
    </div>);
  }
}

ActivityForm.propTypes = {
  isProcessing: PropTypes.bool,
  newsletter: PropTypes.shape({}),
  action: PropTypes.func.isRequired,
  groupId: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ActivityForm.defaultProps = {
  isProcessing: null,
  newsletter: {},
  groupId: null,
};
