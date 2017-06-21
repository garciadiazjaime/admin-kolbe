/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { selectParent } from '../../../../actions/parent';
import { getGroupsByParent } from '../../../../actions/parent/show';
import ParentShowContainer from '../../../../containers/parent/show';

class ParentShow extends Component {

  static renderGroups(data, groupById, parentId) {
    return _.isArray(data) && data.length && !_.isEmpty(groupById) ? data.map(item => <div key={item._id}>
      <Subheader>{groupById[item.groupId]}</Subheader>
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false} stripedRows>
          <TableRow displayBorder={false}>
            <TableRowColumn>
              <Link to={`/parent/${parentId}/group/${item.groupId}/activity`}>Actividades</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={`/parent/${parentId}/group/${item.groupId}/document`}>Documentos</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={`/parent/${parentId}/group/${item.groupId}/newsletter`}>Noticias</Link>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>) : null;
  }

  componentDidMount() {
    const { dispatch, params, selectedParent } = this.props;

    if (!selectedParent || selectedParent !== params.parentId) {
      dispatch(selectParent(params.parentId));
    }
    dispatch(getGroupsByParent(params.parentId));
  }

  render() {
    const { groups, groupById, params } = this.props;
    return (<div>
      {ParentShow.renderGroups(groups, groupById, params.parentId)}
    </div>);
  }
}

ParentShow.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedParent: PropTypes.string,
  groupById: PropTypes.shape({}),
  groups: PropTypes.arrayOf(PropTypes.shape({})),
};

ParentShow.defaultProps = {
  selectedParent: null,
  groupById: {},
  groups: [],
};

export default ParentShowContainer(ParentShow);
