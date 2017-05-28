/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import DocumentForm from '../form';
import DocumentContainer from '../../../../containers/document';
import { saveDocument } from '../../../../actions/document';

class DocumentAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { params, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${params.groupId}/document?success`);
    }
  }

  actionHandler(data) {
    const { params, dispatch } = this.props;
    dispatch(saveDocument(params.groupId, data));
  }

  render() {
    const { params } = this.props;
    return (<div>
      <DocumentForm
        action={this.actionHandler}
        groupId={params.groupId}
        title="Agregar Documento"
      />
    </div>);
  }
}

DocumentAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  lastUpdated: PropTypes.number,
};

DocumentAdd.defaultProps = {
  lastUpdated: null,
};

export default DocumentContainer(DocumentAdd);
