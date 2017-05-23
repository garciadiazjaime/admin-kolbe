/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import ParentListContainer from '../../../../containers/parent/list';
import { getParents } from '../../../../actions/parent/list';

class ParentList extends Component {

  static renderParents(data) {
    if (data && data.length) {
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.email}</TableRowColumn>
        <TableRowColumn>{item.code}</TableRowColumn>
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
    const { params } = this.props;
    const { dispatch } = this.props;
    dispatch(getParents(params.groupId));
  }

  render() {
    const { parents } = this.props;
    return (<div>
      <div className="clearfix" />
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Código</TableHeaderColumn>
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
  dispatch: PropTypes.func.isRequired,
  parents: PropTypes.arrayOf(PropTypes.shape({})),
};

ParentList.defaultProps = {
  parents: [],
};

export default ParentListContainer(ParentList);
