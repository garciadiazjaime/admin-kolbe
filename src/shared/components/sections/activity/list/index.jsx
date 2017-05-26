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

import { ContentAdd, ContentCreate, ContentClear } from 'material-ui/svg-icons';
import ActivityListContainer from '../../../../containers/activity/list';
import { getActivities, deleteActivity } from '../../../../actions/activity/list';
import { selectGroup } from '../../../../actions/group';

class LocationList extends Component {

  constructor(args) {
    super(args);
    this.state = {
      data: [],
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getActivities(params.groupId));
  }

  deleteHandler(e) {
    const activityId = e.currentTarget.dataset.id;
    const { dispatch, selectedGroup } = this.props;
    dispatch(deleteActivity(selectedGroup, activityId));
  }

  renderActivities(data) {
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
        <TableRowColumn style={style}>
          <a onClick={this.deleteHandler} role="button" tabIndex="0" data-id={item._id}>
            <ContentClear />
          </a>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
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
            <TableHeaderColumn>Eliminar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {this.renderActivities(activities)}
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
