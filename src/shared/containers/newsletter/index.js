import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { newsletterHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    groupId,
    data: newsletter,
  } = newsletterHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    newsletter,
    groupId,
  };
};

export default connect(mapStateToProps);
