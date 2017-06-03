/* eslint max-len: [2, 500, 4] */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { FileFileUpload } from 'material-ui/svg-icons';

import { selectGroup } from '../../../../actions/group';
import GroupContainer from '../../../../containers/group';

class Groupshow extends Component {

  componentDidMount() {
    const { dispatch, params, selectedGroup } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
  }

  render() {
    const { params } = this.props;
    const { groupId } = params;
    return (<div>
      <Subheader>
        Información del Grupo
      </Subheader>
      <Table selectable={false} key={groupId}>
        <TableBody displayRowCheckbox={false} stripedRows>
          <TableRow displayBorder={false}>
            <TableRowColumn>
              <Link to={`/group/${groupId}/activity`}>Actividades</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={`/group/${groupId}/document`}>Documentos</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={`/group/${groupId}/newsletter`}>Noticias</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={`/group/${groupId}/parent`}>Padres</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={`/group/${groupId}/upload`}>
                <FileFileUpload />
              </Link>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>);
  }
}

Groupshow.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string,
};

Groupshow.defaultProps = {
  selectedGroup: null,
};

export default GroupContainer(Groupshow);
