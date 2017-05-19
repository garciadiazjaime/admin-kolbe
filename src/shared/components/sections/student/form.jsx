/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';

export default class StudentForm extends Component {

  constructor(args) {
    super(args);
    const { groupId, student } = this.props;
    const initData = _.isEmpty(student) ? {
      date: new Date(),
      groupId,
    } : student;
    this.state = {
      data: initData,
      valid: {},
      touch: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.invalidText = 'Obligatorio';
    this.entityId = _.isEmpty(student) ? groupId : student._id;
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
    const requiredFields = ['name', 'lastname', 'lastname2', 'code'];
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
      this.props.action(this.entityId, data);
    }
  }

  render() {
    const { isProcessing, groupId } = this.props;
    const { data, valid, touch } = this.state;
    return (<div>
      <Link to={`/group/${groupId}/student`} className="pull-right">
        <ContentClear />
      </Link>
      <TextField name="name" floatingLabelText="Nombre" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.name && touch.name ? this.invalidText : null} defaultValue={data.name} />
      <br />
      <span>{data.file}</span>
      <br />
      <TextField name="lastname" floatingLabelText="Apellido Paterno" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.lastname && touch.lastname ? this.invalidText : null} defaultValue={data.lastname} />
      <br />
      <TextField name="lastname2" floatingLabelText="Apellido Materno" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.lastname2 && touch.lastname2 ? this.invalidText : null} defaultValue={data.lastname2} />
      <br />
      <TextField name="code" floatingLabelText="Código" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.code && touch.code ? this.invalidText : null} defaultValue={data.code} />
      <br />
      <RaisedButton label="Guardar" primary fullWidth onTouchTap={this.handleSubmit} />
      <br />
      { isProcessing ? <LinearProgress mode="indeterminate" /> : null }
    </div>);
  }
}

StudentForm.propTypes = {
  isProcessing: PropTypes.bool,
  student: PropTypes.shape({}),
  action: PropTypes.func.isRequired,
  groupId: PropTypes.string,
};

StudentForm.defaultProps = {
  isProcessing: null,
  student: {},
  groupId: null,
};
