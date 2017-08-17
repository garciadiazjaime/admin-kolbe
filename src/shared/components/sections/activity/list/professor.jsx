/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { ContentAdd, ContentCreate, ContentClear, ActionPermContactCalendar } from 'material-ui/svg-icons';
import ActivityListContainer from '../../../../containers/activity/list';
import { deleteActivity } from '../../../../actions/activity/list';

class ActivityProfessorList extends Component {

  constructor(args) {
    super(args);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(e) {
    const activityId = e.currentTarget.dataset.id;
    const { dispatch, selectedGroup } = this.props;
    dispatch(deleteActivity(selectedGroup, activityId));
  }

  renderActivities() {
    const { activities, selectedGroup } = this.props;
    if (activities.length) {
      const style = {
        paddingLeft: '42px',
      };
      return activities.map(activity => <TableRow key={activity._id}>
        <TableRowColumn>{activity.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(activity.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/group/${selectedGroup}/activity/${activity._id}/edit`}>
            <ContentCreate />
          </Link>
        </TableRowColumn>
        <TableRowColumn style={style}>
          <a onClick={this.deleteHandler} role="button" tabIndex="0" data-id={activity._id}>
            <ContentClear />
          </a>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  render() {
    const { params } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/activity/add`} className="pull-right">
        <FloatingActionButton mini>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      <Link to={`/group/${params.groupId}/activity/calendar`} className="pull-right">
        <FloatingActionButton mini>
          <ActionPermContactCalendar />
        </FloatingActionButton>
      </Link>
      <div className="clearfix" />
      <Subheader>Actividades</Subheader>
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Fecha</TableHeaderColumn>
            <TableHeaderColumn>Editar</TableHeaderColumn>
            <TableHeaderColumn>Eliminar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {this.renderActivities()}
        </TableBody>
      </Table>
    </div>);
  }
}

ActivityProfessorList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ActivityProfessorList.defaultProps = {
  selectedGroup: '',
};

export default ActivityListContainer(ActivityProfessorList);
