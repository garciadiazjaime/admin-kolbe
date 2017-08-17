import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { activityHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    data: activity,
  } = activityHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    activity,
  };
};

export default connect(mapStateToProps);
