import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { groupUploadHelper } = state;
  const {
    isProcessing,
    lastUpdated,
  } = groupUploadHelper || {
    isProcessing: false,
  };

  return {
    isProcessing,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
