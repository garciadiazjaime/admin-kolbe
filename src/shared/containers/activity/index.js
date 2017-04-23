import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { groupId, activityHelper } = state;
  const {
    isSaving,
    lastUpdated,
  } = activityHelper || {
    isSaving: true,
    data: {},
  };

  return {
    groupId,
    isSaving,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
