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
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
    const { dispatch, params } = this.props;
    dispatch(deleteDocument(params.groupId, documentId));
  }

  renderDocuments() {
    const { documents, params } = this.props;
    if (documents.length) {
      const style = {
        paddingLeft: '42px',
      };
      return documents.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/group/${params.groupId}/document/${item._id}/edit`}>
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
    const { params } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/document/add`} className="pull-right">
        <FloatingActionButton mini>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      <div className="clearfix" />
      <Subheader>Documentos y Tareas</Subheader>
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
          {this.renderDocuments()}
        </TableBody>
      </Table>
    </div>);
  }
}

DocumentDocumentList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DocumentListContainer(DocumentDocumentList);
