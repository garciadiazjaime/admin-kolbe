import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { groupUploadHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    data: file,
  } = groupUploadHelper || {
    isProcessing: false,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    file,
  };
};

export default connect(mapStateToProps);
