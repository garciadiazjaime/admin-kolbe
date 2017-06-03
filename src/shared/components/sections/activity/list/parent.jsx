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

import { ContentCreate } from 'material-ui/svg-icons';
import ActivityListContainer from '../../../../containers/activity/list';

class ActivityParentList extends Component {

  static renderActivities(data) {
    if (data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/activity/${item._id}/show`}>
            <ContentCreate />
          </Link>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  render() {
    const { activities } = this.props;
    return (<Table selectable={false} displayRowCheckbox={false}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Nombre</TableHeaderColumn>
          <TableHeaderColumn>Fecha</TableHeaderColumn>
          <TableHeaderColumn>Ver</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows>
        {ActivityParentList.renderActivities(activities)}
      </TableBody>
    </Table>);
  }
}

ActivityParentList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ActivityListContainer(ActivityParentList);
