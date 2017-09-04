import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import DocumentContainer from '../../../../containers/document';
import { getDocument } from '../../../../actions/document';
import constants from '../../../../../constants';

class DocumentShow extends Component {

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getDocument(params.groupId, params.documentId));
  }

  render() {
    const { document, params } = this.props;
    return _.isEmpty(document) ? <LinearProgress mode="indeterminate" /> : (<Card>
      <Link to={`/parent/${params.parentId}/group/${params.groupId}/document`} className="pull-right">
        <ContentClear />
      </Link>
      <div className="clearfix" />
      <CardTitle title="Documento" />

      <CardTitle subtitle="Nombre">
        <CardText>
          {document.name}
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Descripción">
        <CardText>
          {document.description}
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Archivo">
        <CardText>
          <a
            href={`${constants.docsUrl}/${document.realFile}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {document.file}
          </a>
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Fecha">
        <CardText>
          {moment(document.date).format('DD/MM/YYYY')}
        </CardText>
      </CardTitle>
    </Card>);
  }
}

DocumentShow.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  document: PropTypes.shape({}),
};

DocumentShow.defaultProps = {
  document: {},
};

export default DocumentContainer(DocumentShow);
