/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { ContentAdd, ContentCreate, SocialGroup } from 'material-ui/svg-icons';
import ParentListContainer from '../../../../containers/parent/list';
import { getParents } from '../../../../actions/parent/list';
import { selectGroup } from '../../../../actions/group';

class ParentList extends Component {

  static renderParents(data) {
    if (data && data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.email}</TableRowColumn>
        <TableRowColumn>{item.code}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/parent/${item._id}/edit`}>
            <ContentCreate />
          </Link>
        </TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/parent/${item._id}/student`}>
            <SocialGroup />
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
    if (params.groupId && selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getParents(params.groupId));
  }

  render() {
    const { params, parents } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/parent/add`} className="pull-right">
        <ContentAdd />
      </Link>
      <div className="clearfix" />
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Código</TableHeaderColumn>
            <TableHeaderColumn>Editar</TableHeaderColumn>
            <TableHeaderColumn>Estudiantes</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {ParentList.renderParents(parents)}
        </TableBody>
      </Table>
    </div>);
  }
}

ParentList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  parents: PropTypes.arrayOf(PropTypes.shape({})),
};

ParentList.defaultProps = {
  selectedGroup: '',
  parents: [],
};

export default ParentListContainer(ParentList);
