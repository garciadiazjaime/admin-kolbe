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
import NewsletterListContainer from '../../../../containers/newsletter/list';
import { deleteNewsletter } from '../../../../actions/newsletter/list';

class NewsletterNewsletterList extends Component {

  constructor(args) {
    super(args);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(e) {
    const newsletterId = e.currentTarget.dataset.id;
    const { dispatch, params } = this.props;
    dispatch(deleteNewsletter(params.groupId, newsletterId));
  }

  renderNewsletters() {
    const { newsletters, params } = this.props;
    if (newsletters.length) {
      const style = {
        paddingLeft: '42px',
      };
      return newsletters.map(item => <TableRow key={item._id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>{moment(item.date).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/group/${params.groupId}/newsletter/${item._id}/edit`}>
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
      <Link to={`/group/${params.groupId}/newsletter/add`} className="pull-right">
        <FloatingActionButton mini>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      <div className="clearfix" />
      <Subheader>Noticias</Subheader>
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
          {this.renderNewsletters()}
        </TableBody>
      </Table>
    </div>);
  }
}

NewsletterNewsletterList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  newsletters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NewsletterListContainer(NewsletterNewsletterList);
