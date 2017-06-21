/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { ContentCreate } from 'material-ui/svg-icons';
import StudentGroupListContainer from '../../../../containers/student/group';
import { getStudentsFromGroup } from '../../../../actions/student/list';
import { selectGroup } from '../../../../actions/group';

class StudentList extends Component {

  static renderActivities(data) {
    if (data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{`${item.lastname} ${item.lastname2}`}</TableRowColumn>
        <TableRowColumn>{item.code}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/student/${item._id}/edit`}>
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
    const { params, dispatch, selectedGroup } = this.props;
    if (params.groupId && params.groupId !== selectedGroup) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getStudentsFromGroup(params.groupId));
  }

  render() {
    const { students } = this.props;
    return (<div>
      <div className="clearfix" />
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Appellidos</TableHeaderColumn>
            <TableHeaderColumn>Código</TableHeaderColumn>
            <TableHeaderColumn>Editar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {StudentList.renderActivities(students)}
        </TableBody>
      </Table>
    </div>);
  }
}

StudentList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedGroup: PropTypes.string.isRequired,
};

// StudentList.defaultProps = {
//   selectedParent: null,
//   selectedGroup: null,
// };

export default StudentGroupListContainer(StudentList);
