/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
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

import { NavigationChevronRight } from 'material-ui/svg-icons';
import DocumentListContainer from '../../../../containers/newsletter/list';

class DocumentParentList extends Component {

  static renderNewsletters(data, parentId, groupId) {
    if (data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/parent/${parentId}/group/${groupId}/newsletter/${item._id}/show`}>
            <NavigationChevronRight />
          </Link>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  render() {
    const { newsletters, parentId, groupId } = this.props;
    return (<div>
      <Subheader>Noticias</Subheader>
      <Table selectable={false} displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Fecha</TableHeaderColumn>
            <TableHeaderColumn>Ver</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {DocumentParentList.renderNewsletters(newsletters, parentId, groupId)}
        </TableBody>
      </Table>
    </div>);
  }
}

DocumentParentList.propTypes = {
  newsletters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  parentId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default DocumentListContainer(DocumentParentList);
