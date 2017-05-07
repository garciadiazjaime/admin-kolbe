import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { documentHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    groupId,
    data: document,
  } = documentHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    document,
    groupId,
  };
};

export default connect(mapStateToProps);
