import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { parentHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    groupId,
    data: parent,
  } = parentHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    parent,
    groupId,
  };
};

export default connect(mapStateToProps);
