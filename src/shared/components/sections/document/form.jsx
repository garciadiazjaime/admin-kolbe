/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';
import FormData from 'form-data';

import style from './style.scss';

export default class ActivityForm extends Component {

  constructor(args) {
    super(args);
    const { document } = this.props;
    const initData = _.isEmpty(document) ? {
      date: new Date(),
    } : document;
    this.state = {
      data: initData,
      valid: {},
      touch: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.invalidText = 'Obligatorio';
    this.extensionsAllowed = ['xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'doc', 'docx', 'pdf', 'ppt', 'pttx', 'png', 'gif'];
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

  handleFileUpload() {
    const { files } = document.getElementById('file');
    if (files.length) {
      const file = files[0];
      const extension = file.name.split('.').pop().toLowerCase();
      const newState = _.assign({}, this.state);

      if (!newState.touch.file) {
        newState.touch.file = true;
      }
      if (this.extensionsAllowed.indexOf(extension) !== -1) {
        newState.data.file = file.name;
        newState.valid.file = true;
      } else {
        newState.valid.file = false;
      }

      this.setState(newState);
    }
  }

  handleSubmit() {
    const { data } = this.state;
    const newState = _.assign({}, this.state);
    const requiredFields = ['name', 'description', 'file'];
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
      const { files } = document.getElementById('file');
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(data));
      this.props.action(formData);
    }
  }

  render() {
    const { isProcessing, groupId, title } = this.props;
    const { data, valid, touch } = this.state;
    return (<div>
      <Link to={`/group/${groupId}/document`} className="pull-right">
        <ContentClear />
      </Link>
      <div className="clearfix" />
      <Subheader>{title}</Subheader>
      <TextField name="name" floatingLabelText="Nombre" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!valid.name && touch.name ? this.invalidText : null} defaultValue={data.name} />
      <br />
      <Subheader>Archivo</Subheader>
      <RaisedButton containerElement="label" label="Buscar">
        <input type="file" id="file" name="file" onChange={this.handleFileUpload} className={style.input} />
      </RaisedButton>
      { this.state.touch.file && !this.state.valid.file ?
        <div className="text-danger">Seleccionar Archivo</div> : null }
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
  document: PropTypes.shape({}),
  action: PropTypes.func.isRequired,
  groupId: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ActivityForm.defaultProps = {
  isProcessing: null,
  document: {},
  groupId: null,
};
