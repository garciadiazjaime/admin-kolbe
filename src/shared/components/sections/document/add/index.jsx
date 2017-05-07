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
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/document?success`);
    }
  }

  actionHandler(groupId, data) {
    const { dispatch } = this.props;
    dispatch(saveDocument(groupId, data));
  }

  render() {
    const { params } = this.props;
    return (<div className="container-fluid">
      <DocumentForm action={this.actionHandler} groupId={params.groupId} />
    </div>);
  }
}

DocumentAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

DocumentAdd.defaultProps = {
  lastUpdated: null,
  groupId: null,
};

export default DocumentContainer(DocumentAdd);
