import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { newsletterHelper } = state;
  const {
    isProcessing,
    didInvalidate,
    lastUpdated,
    data: newsletter,
  } = newsletterHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    didInvalidate,
    lastUpdated,
    newsletter,
  };
};

export default connect(mapStateToProps);
