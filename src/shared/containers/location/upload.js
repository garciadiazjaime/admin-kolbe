import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { groupUploadHelper, selectedLocation } = state;
  const {
    isProcessing,
    lastUpdated,
  } = groupUploadHelper || {
    isProcessing: false,
  };

  return {
    selectedLocation,
    isProcessing,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
