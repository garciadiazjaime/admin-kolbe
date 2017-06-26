import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import ActivityContainer from '../../../../containers/activity';
import { getActivity } from '../../../../actions/activity';

class ActivityShow extends Component {

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getActivity(params.activityId));
  }

  render() {
    const { activity, params } = this.props;
    return _.isEmpty(activity) ? <LinearProgress mode="indeterminate" /> : (<Card>
      <Link to={`/parent/${params.parentId}/group/${params.groupId}/activity/calendar`} className="pull-right">
        <ContentClear />
      </Link>
      <div className="clearfix" />
      <CardTitle title="Actividad" />

      <CardTitle subtitle="Nombre">
        <CardText>
          {activity.name}
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Descripción">
        <CardText>
          {activity.description}
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Fecha">
        <CardText>
          {moment(activity.date).format('DD/MM/YYYY')}
        </CardText>
      </CardTitle>
    </Card>);
  }
}

ActivityShow.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  activity: PropTypes.shape({}),
};

ActivityShow.defaultProps = {
  activity: {},
};

export default ActivityContainer(ActivityShow);
