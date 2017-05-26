import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, documentsByGroup } = state;
  const {
    isProcessing,
    lastUpdated,
    data: documents,
  } = documentsByGroup[selectedGroup] || {
    isProcessing: true,
    data: [],
  };

  return {
    selectedGroup,
    isProcessing,
    lastUpdated,
    documents,
  };
};

export default connect(mapStateToProps);
