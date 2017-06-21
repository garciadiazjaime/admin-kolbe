/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import DocumentListContainer from '../../../../containers/document/list';
import { deleteDocument } from '../../../../actions/document/list';

class DocumentDocumentList extends Component {

  constructor(args) {
    super(args);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(e) {
    const documentId = e.currentTarget.dataset.id;
    const { dispatch, selectedGroup } = this.props;
    dispatch(deleteDocument(selectedGroup, documentId));
  }

  renderDocuments(data) {
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
    const { params, documents } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/document/add`} className="pull-right">
        <ContentAdd />
      </Link>
      <div className="clearfix" />
      <Subheader>Documentos</Subheader>
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
          {this.renderDocuments(documents)}
        </TableBody>
      </Table>
    </div>);
  }
}

DocumentDocumentList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

DocumentDocumentList.defaultProps = {
  selectedGroup: '',
};

export default DocumentListContainer(DocumentDocumentList);
