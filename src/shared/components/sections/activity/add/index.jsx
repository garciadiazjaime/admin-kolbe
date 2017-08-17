/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import ActivityForm from '../form';
import ActivityContainer from '../../../../containers/activity';
import { saveActivity } from '../../../../actions/activity';

class AcitivityAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { params, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${params.groupId}/activity?success`);
    }
  }

  actionHandler(groupId, data) {
    const { dispatch } = this.props;
    dispatch(saveActivity(groupId, data));
  }

  render() {
    const { params } = this.props;
    return (<div>
      <ActivityForm
        action={this.actionHandler}
        groupId={params.groupId}
        title="Agregar Actividad"
      />
    </div>);
  }
}

AcitivityAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  lastUpdated: PropTypes.number,
};

AcitivityAdd.defaultProps = {
  lastUpdated: null,
};

export default ActivityContainer(AcitivityAdd);
