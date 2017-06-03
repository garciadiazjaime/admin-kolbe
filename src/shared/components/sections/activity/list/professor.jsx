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

import { ContentCreate, ContentClear } from 'material-ui/svg-icons';
import ActivityListContainer from '../../../../containers/activity/list';
import { deleteActivity } from '../../../../actions/activity/list';

class ActivityProfList extends Component {

  constructor(args) {
    super(args);
    this.deleteHandler = this.deleteHandler.bind(this);
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
    const { activities } = this.props;
    return (<Table selectable={false} displayRowCheckbox={false}>
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
    </Table>);
  }
}

ActivityProfList.propTypes = {
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ActivityProfList.defaultProps = {
  selectedGroup: '',
};

export default ActivityListContainer(ActivityProfList);
