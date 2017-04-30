/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';

import saveActivityAction from '../../../../actions/activity';
import ActivityContainer from '../../../../containers/activity';

class AcitivityAdd extends Component {

  constructor(args) {
    super(args);
    const { params } = this.props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {
        date: new Date(),
        groupId: params.groupId,
      },
      valid: {},
      touch: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.invalidText = 'Obligatorio';
  }

  componentWillReceiveProps(nextProps) {
    const { params, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${params.groupId}/activity?success`);
    }
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
    const { dispatch, params } = this.props;
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
      dispatch(saveActivityAction(params.groupId, this.state.data));
    }
  }

  render() {
    const { params, isSaving } = this.props;
    return (<div className="container-fluid">
      <Link to={`/group/${params.groupId}/activity`} className="pull-right">
        <ContentClear />
      </Link>
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
