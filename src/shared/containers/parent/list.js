import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, parentsByGroup } = state;
  const {
    isProcessing,
    lastUpdated,
    data: parents,
  } = parentsByGroup[selectedGroup] || {
    isProcessing: true,
    data: [],
  };

  return {
    selectedGroup,
    isProcessing,
    lastUpdated,
    parents,
  };
};

export default connect(mapStateToProps);
