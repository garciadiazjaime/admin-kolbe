/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';

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

  actionHandler(documentId, data) {
    const { dispatch } = this.props;
    dispatch(updateDocument(documentId, data));
  }

  render() {
    const { document, lastUpdated } = this.props;
    return _.isEmpty(document) ? <LinearProgress mode="indeterminate" /> : (<div className="container-fluid">
      <Subheader>Editar Documento</Subheader>
      <DocumentForm action={this.actionHandler} groupId={document.groupId} document={document} lastUpdated={lastUpdated} />
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
