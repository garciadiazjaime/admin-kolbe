/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/less/styles.less';

import ActivityListContainer from '../../../../containers/activity/list';
import { getActivities } from '../../../../actions/activity/list';
import { selectGroup } from '../../../../actions/group';
import CustomToolbar from './customToolbar';
import CustomHeader from './customHeader';
import style from './style.scss';

BigCalendar.momentLocalizer(moment);

class ActivityCalendar extends Component {

  static getEvents(data) {
    const response = data.map(item => ({
      id: item._id,
      title: item.name,
      description: item.description,
      allDay: true,
      start: item.date,
      end: item.date,
    }));
    return response;
  }

  constructor(args) {
    super(args);
    this.showEvent = this.showEvent.bind(this);
  }

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getActivities(params.groupId));
  }

  showEvent(data) {
    const { params } = this.props;
    const nextUrl = params.parentId ? `/parent/${params.parentId}/group/${params.groupId}/activity/${data.id}/show` : `/activity/${data.id}`;
    browserHistory.push(nextUrl);
  }

  render() {
    const { activities } = this.props;
    return (<div>
      <br />
      <BigCalendar
        popup
        selectable
        className={style.calendarWrapper}
        events={ActivityCalendar.getEvents(activities)}
        views={['month']}
        culture="es"
        onSelectEvent={this.showEvent}
        components={{
          toolbar: CustomToolbar,
          month: { header: CustomHeader },
        }}
      />
    </div>);
  }
}

ActivityCalendar.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};


ActivityCalendar.defaultProps = {
  selectedGroup: '',
};

export default ActivityListContainer(ActivityCalendar);
