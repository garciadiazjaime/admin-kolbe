import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, parentHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    data: parent,
  } = parentHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    parent,
    selectedGroup,
  };
};

export default connect(mapStateToProps);
