import React, { Component, PropTypes } from 'react';

import DocumentListContainer from '../../../../containers/document/list';
import { getDocuments } from '../../../../actions/document/list';
import { selectGroup } from '../../../../actions/group';
import ParentList from './parent';
import ProfessorList from './professor';

class DocumentList extends Component {

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getDocuments(params.groupId));
  }

  render() {
    const { params, documents } = this.props;
    return params.parentId ?
      (<ParentList
        documents={documents}
        parentId={params.parentId}
        groupId={params.groupId}
      />) :
      (<ProfessorList {...this.props} />);
  }
}

DocumentList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

DocumentList.defaultProps = {
  selectedGroup: '',
};

export default DocumentListContainer(DocumentList);
