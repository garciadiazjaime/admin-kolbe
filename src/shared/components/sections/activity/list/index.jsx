/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import { ContentAdd, ContentCreate } from 'material-ui/svg-icons';
import ActivityController from '../../../../../client/controllers/activityController';
import ActivityListContainer from '../../../../containers/activity/list';
import { fetchActivitiesAction } from '../../../../actions/activity/list';

class LocationList extends Component {

  static renderActivities(data) {
    if (data.length) {
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/activity/${item._id}/edit`}>
            <ContentCreate />
          </Link>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  constructor(args) {
    super(args);
    this.controller = new ActivityController();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { params } = this.props;
    const { dispatch } = this.props;
    dispatch(fetchActivitiesAction(params.groupId));
  }

  render() {
    const { params, activities } = this.props;
    return (<div>
      <FloatingActionButton mini href={`/group/${params.groupId}/activity/add`} className="pull-right">
        <ContentAdd />
      </FloatingActionButton>
      <div className="clearfix" />
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Fecha</TableHeaderColumn>
            <TableHeaderColumn>Editar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {LocationList.renderActivities(activities)}
        </TableBody>
      </Table>
    </div>);
  }
}

LocationList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ActivityListContainer(LocationList);
