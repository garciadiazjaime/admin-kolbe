/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { ContentAdd, ContentCreate } from 'material-ui/svg-icons';
import DocumentListContainer from '../../../../containers/document/list';
import { getDocuments } from '../../../../actions/document/list';
import { selectGroup } from '../../../../actions/group';

class DocumentList extends Component {

  static renderDocuments(data) {
    if (data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/document/${item._id}/edit`}>
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
    dispatch(getDocuments(params.groupId));
  }

  render() {
    const { params, documents } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/document/add`} className="pull-right">
        <ContentAdd />
      </Link>
      <div className="clearfix" />
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Fecha</TableHeaderColumn>
            <TableHeaderColumn>Editar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {DocumentList.renderDocuments(documents)}
        </TableBody>
      </Table>
    </div>);
  }
}

DocumentList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

DocumentList.defaultProps = {
  selectedGroup: '',
};

export default DocumentListContainer(DocumentList);
