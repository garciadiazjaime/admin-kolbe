import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { userHelper, apiHelper } = state;

  const {
    isProcessing,
    didInvalidate,
    data: user,
  } = userHelper || {
    didInvalidate: false,
    isProcessing: false,
    data: {},
  };

  let error = null;
  if (apiHelper && apiHelper.error) {
    error = apiHelper.error;
  }

  return {
    user,
    isProcessing,
    didInvalidate,
    error,
  };
};

export default connect(mapStateToProps);
