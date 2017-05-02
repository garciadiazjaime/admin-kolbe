/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
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
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/activity?success`);
    }
  }

  actionHandler(activityId, data) {
    const { dispatch } = this.props;
    dispatch(updateActivity(activityId, data));
  }

  render() {
    const { activity, lastUpdated } = this.props;
    return _.isEmpty(activity) ? <LinearProgress mode="indeterminate" /> : (<div className="container-fluid">
      <ActivityForm action={this.actionHandler} groupId={activity.groupId} activity={activity} lastUpdated={lastUpdated} />
    </div>);
  }
}

ActivityEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  activity: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

ActivityEdit.defaultProps = {
  activity: {},
  lastUpdated: null,
  groupId: null,
};


export default ActivityContainer(ActivityEdit);
