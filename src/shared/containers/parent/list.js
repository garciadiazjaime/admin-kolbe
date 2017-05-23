import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, parentsByGroup } = state;
  const {
    isFetching,
    lastUpdated,
    data: parents,
  } = parentsByGroup[selectedGroup] || {
    isFetching: true,
    data: [],
  };

  return {
    isFetching,
    lastUpdated,
    parents,
  };
};

export default connect(mapStateToProps);
