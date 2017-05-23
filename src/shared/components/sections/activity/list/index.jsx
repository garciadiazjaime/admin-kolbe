/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';

import { ContentAdd, ContentCreate } from 'material-ui/svg-icons';
import ActivityListContainer from '../../../../containers/activity/list';
import { fetchActivitiesAction } from '../../../../actions/activity/list';
import { selectGroup } from '../../../../actions/group';

class LocationList extends Component {

  static renderActivities(data) {
    if (data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
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
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(fetchActivitiesAction(params.groupId));
  }

  render() {
    const { params, activities } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/activity/add`} className="pull-right">
        <ContentAdd />
      </Link>
      <div className="clearfix" />
      <Subheader>Actividades</Subheader>
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
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

LocationList.defaultProps = {
  selectedGroup: '',
};

export default ActivityListContainer(LocationList);
