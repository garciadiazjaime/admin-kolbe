import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedParent, studentsByParent } = state;
  const {
    isFetching,
    lastUpdated,
    data: students,
  } = studentsByParent[selectedParent] || {
    isFetching: true,
    data: [],
  };

  return {
    selectedParent,
    isFetching,
    lastUpdated,
    students,
  };
};

export default connect(mapStateToProps);
