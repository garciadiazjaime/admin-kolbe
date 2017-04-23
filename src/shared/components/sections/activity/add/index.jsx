/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/clear';
import LinearProgress from 'material-ui/LinearProgress';

import saveActivityAction from '../../../../actions/activity';
import ActivityContainer from '../../../../containers/activity';

class AcitivityAdd extends Component {

  constructor(args) {
    super(args);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {
        date: new Date(),
      },
      valid: {},
      touch: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.invalidText = 'Obligatorio';
  }

  handleInputChange(event, newDate) {
    let newState = null;
    if (event) {
      const { name, value } = event.target;
      newState = _.assign({}, this.state);
      newState.data[name] = value;
      newState.valid[name] = !!value;
      if (!this.state.touch[name]) {
        this.state.touch[name] = true;
      }
    } else if (newDate) {
      newState = _.assign({}, this.state);
      newState.data.date = newDate;
    }

    if (newState) {
      this.setState(newState);
    }
  }

  handleSubmit() {
    const { dispatch, params } = this.props;
    const { data } = this.state;
    const newState = _.assign({}, this.state);
    const requiredFields = ['name', 'description'];
    let isReady = true;
    requiredFields.map((key) => {
      if (!data[key]) {
        isReady = false;
      }
      if (!newState.touch[key]) {
        newState.touch[key] = true;
      }
      newState.valid[key] = !!data[key];
      return null;
    });
    if (!isReady) {
      this.setState(newState);
    } else {
      dispatch(saveActivityAction(params.groupId, this.state.data));
    }
  }

  render() {
    const { params, isSaving, lastUpdated } = this.props;
    if (lastUpdated) {
      browserHistory.push(`/group/${params.groupId}/activity?success`);
    }
    return (<div className="container-fluid">
      <FloatingActionButton mini className="pull-right" href={`/group/${params.groupId}/activity`}>
        <ContentAdd />
      </FloatingActionButton>
      <TextField name="name" floatingLabelText="Actividad" floatingLabelFixed fullWidth onChange={this.handleInputChange} errorText={!this.state.valid.name && this.state.touch.name ? this.invalidText : null} />
      <br />
      <TextField name="description" floatingLabelText="Descripción" floatingLabelFixed multiLine rows={4} fullWidth onChange={this.handleInputChange} errorText={!this.state.valid.description && this.state.touch.description ? this.invalidText : null} />
      <br />
      <DatePicker name="date" floatingLabelText="Fecha" fullWidth defaultDate={new Date()} onChange={this.handleInputChange} autoOk />
      <br />
      <RaisedButton label="Guardar" primary fullWidth onTouchTap={this.handleSubmit} />
      <br />
      { isSaving ? <LinearProgress mode="indeterminate" /> : null }
    </div>);
  }
}

AcitivityAdd.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  lastUpdated: PropTypes.number,
};

AcitivityAdd.defaultProps = {
  isSaving: null,
  lastUpdated: null,
};

export default ActivityContainer(AcitivityAdd);
