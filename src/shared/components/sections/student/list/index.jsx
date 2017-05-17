/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { ContentCreate } from 'material-ui/svg-icons';
import StudentListContainer from '../../../../containers/student/list';
import { getStudents } from '../../../../actions/student/list';
import { selectParent } from '../../../../actions/parent';

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
    const { params, dispatch, selectedParent } = this.props;
    if (!selectedParent || selectedParent !== params.parentId) {
      dispatch(selectParent(params.parentId));
    }
    dispatch(getStudents(params));
  }

  render() {
    const { params, students } = this.props;
    console.log('params', params);
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
  selectedParent: PropTypes.string,
};

StudentList.defaultProps = {
  selectedParent: null,
};

export default StudentListContainer(StudentList);
