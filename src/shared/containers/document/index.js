import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { documentHelper } = state;
  const {
    isProcessing,
    didInvalidate,
    lastUpdated,
    data: document,
  } = documentHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    didInvalidate,
    lastUpdated,
    document,
  };
};

export default connect(mapStateToProps);
