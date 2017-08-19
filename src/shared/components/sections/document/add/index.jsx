/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import DocumentForm from '../form';
import DocumentContainer from '../../../../containers/document';
import { saveDocument } from '../../../../actions/document';
import ApiErrorElement from '../../../elements/errorElement';

class DocumentAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { params, didInvalidate, lastUpdated } = nextProps;
    if (lastUpdated && !didInvalidate) {
      browserHistory.push(`/group/${params.groupId}/document?success`);
    }
  }

  actionHandler(data) {
    const { params, dispatch } = this.props;
    dispatch(saveDocument(params.groupId, data));
  }

  render() {
    const { params, didInvalidate, lastUpdated } = this.props;
    return (<div>
      <DocumentForm
        action={this.actionHandler}
        groupId={params.groupId}
        title="Agregar Documento"
      />
      { lastUpdated && didInvalidate ? <ApiErrorElement /> : null }
    </div>);
  }
}

DocumentAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  didInvalidate: PropTypes.bool,
  lastUpdated: PropTypes.number,
};

DocumentAdd.defaultProps = {
  didInvalidate: false,
  lastUpdated: null,
};

export default DocumentContainer(DocumentAdd);
