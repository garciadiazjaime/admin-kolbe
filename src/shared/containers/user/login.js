import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { userHelper } = state;

  const {
    isProcessing,
    data: user,
  } = userHelper || {
    isProcessing: false,
    data: {},
  };

  return {
    user,
    isProcessing,
  };
};

export default connect(mapStateToProps);
