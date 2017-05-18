import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, studentsByGroup } = state;
  const {
    isFetching,
    lastUpdated,
    data: students,
  } = studentsByGroup[selectedGroup] || {
    isFetching: true,
    data: [],
  };

  return {
    selectedGroup,
    isFetching,
    lastUpdated,
    students,
  };
};

export default connect(mapStateToProps);
