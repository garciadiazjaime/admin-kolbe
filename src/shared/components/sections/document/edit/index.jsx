/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';

import DocumentForm from '../form';
import DocumentContainer from '../../../../containers/document';
import { getDocument, updateDocument } from '../../../../actions/document';

class DocumentEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getDocument(params.documentId));
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/document?success`);
    }
  }

  actionHandler(data) {
    const { params, dispatch, document } = this.props;
    dispatch(updateDocument(params.documentId, data, document.groupId));
  }

  render() {
    const { document, lastUpdated } = this.props;
    return _.isEmpty(document) ? <LinearProgress mode="indeterminate" /> : (<div>
      <DocumentForm
        action={this.actionHandler}
        groupId={document.groupId}
        document={document}
        lastUpdated={lastUpdated}
        title="Editar Documento"
      />
    </div>);
  }
}

DocumentEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  document: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

DocumentEdit.defaultProps = {
  document: {},
  lastUpdated: null,
  groupId: null,
};


export default DocumentContainer(DocumentEdit);
