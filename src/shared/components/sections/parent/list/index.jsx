/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { ContentClear } from 'material-ui/svg-icons';
import Subheader from 'material-ui/Subheader';

import ParentListContainer from '../../../../containers/parent/list';
import { getParents, deleteParent } from '../../../../actions/parent/list';
import { selectGroup } from '../../../../actions/group';

class ParentList extends Component {

  constructor(args) {
    super(args);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;

    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getParents(params.groupId));
  }

  deleteHandler(e) {
    const entityId = e.currentTarget.dataset.id;
    const { dispatch, selectedGroup } = this.props;
    dispatch(deleteParent(selectedGroup, entityId));
  }

  renderParents(data) {
    if (data && data.length) {
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.email}</TableRowColumn>
        <TableRowColumn>{item.code}</TableRowColumn>
        <TableRowColumn>
          <a onClick={this.deleteHandler} role="button" tabIndex="0" data-id={item._id}>
            <ContentClear />
          </a>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  render() {
    const { parents } = this.props;
    return (<div>
      <Subheader>Padres</Subheader>
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Código</TableHeaderColumn>
            <TableHeaderColumn>Eliminar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {this.renderParents(parents)}
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
  parents: [],
  selectedGroup: null,
};

export default ParentListContainer(ParentList);
