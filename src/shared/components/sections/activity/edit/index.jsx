/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import ActivityForm from '../form';
import ActivityContainer from '../../../../containers/activity';
import { getActivity, updateActivity } from '../../../../actions/activity';

class ActivityEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getActivity(params.activityId));
  }

  componentWillReceiveProps(nextProps) {
    const { params, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${params.groupId}/activity?success`);
    }
  }

  actionHandler(data) {
    const { dispatch, params } = this.props;
    dispatch(updateActivity(params.activityId, data));
  }

  render() {
    const { activity, lastUpdated, location, selectedRole, params } = this.props;
    return _.isEmpty(activity) ? <LinearProgress mode="indeterminate" /> : (<div>
      <ActivityForm
        action={this.actionHandler}
        groupId={params.groupId}
        activity={activity}
        lastUpdated={lastUpdated}
        title="Editar Actividad"
        location={location}
        selectedRole={selectedRole}
      />
    </div>);
  }
}

ActivityEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  activity: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  location: PropTypes.shape({}).isRequired,
  selectedRole: PropTypes.number.isRequired,
};

ActivityEdit.defaultProps = {
  activity: {},
  lastUpdated: null,
};


export default ActivityContainer(ActivityEdit);
