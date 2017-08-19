/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';

import DocumentForm from '../form';
import DocumentContainer from '../../../../containers/document';
import { getDocument, updateDocument } from '../../../../actions/document';
import ApiErrorElement from '../../../elements/errorElement';

class DocumentEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getDocument(params.groupId, params.documentId));
  }

  componentWillReceiveProps(nextProps) {
    const { params, didInvalidate, lastUpdated } = nextProps;
    if (lastUpdated && !didInvalidate) {
      browserHistory.push(`/group/${params.groupId}/document?success`);
    }
  }

  actionHandler(data) {
    const { params, dispatch } = this.props;
    dispatch(updateDocument(params.documentId, data, params.groupId));
  }

  render() {
    const { params, document, didInvalidate, lastUpdated } = this.props;
    return _.isEmpty(document) ? <LinearProgress mode="indeterminate" /> : (<div>
      <DocumentForm
        action={this.actionHandler}
        document={document}
        lastUpdated={lastUpdated}
        groupId={params.groupId}
        title="Editar Documento"
      />
      { lastUpdated && didInvalidate ? <ApiErrorElement /> : null }
    </div>);
  }
}

DocumentEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  document: PropTypes.shape({}),
  didInvalidate: PropTypes.bool,
  lastUpdated: PropTypes.number,
};

DocumentEdit.defaultProps = {
  document: {},
  didInvalidate: false,
  lastUpdated: null,
};

export default DocumentContainer(DocumentEdit);
