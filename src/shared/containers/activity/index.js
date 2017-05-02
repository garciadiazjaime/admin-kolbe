import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { activityHelper } = state;
  const {
    isProcessing,
    lastUpdated,
    groupId,
    data: activity,
  } = activityHelper || {
    isProcessing: true,
    data: {},
  };

  return {
    isProcessing,
    lastUpdated,
    activity,
    groupId,
  };
};

export default connect(mapStateToProps);
