import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, studentHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    data: student,
  } = studentHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    student,
    selectedGroup,
  };
};

export default connect(mapStateToProps);
