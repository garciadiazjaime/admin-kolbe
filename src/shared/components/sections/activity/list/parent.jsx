/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
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

import { NavigationChevronRight } from 'material-ui/svg-icons';
import ActivityListContainer from '../../../../containers/activity/list';

class ActivityParentList extends Component {

  static renderActivities(data, parentId, groupId) {
    if (data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/parent/${parentId}/group/${groupId}/activity/${item._id}/show`}>
            <NavigationChevronRight />
          </Link>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  render() {
    const { activities, parentId, groupId } = this.props;
    return (<div>
      <Subheader>Actividades</Subheader>
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Fecha</TableHeaderColumn>
            <TableHeaderColumn>Ver</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {ActivityParentList.renderActivities(activities, parentId, groupId)}
        </TableBody>
      </Table>
    </div>);
  }
}

ActivityParentList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  parentId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default ActivityListContainer(ActivityParentList);
