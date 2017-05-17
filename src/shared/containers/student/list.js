import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedParent, studentsByEntity } = state;
  const {
    isFetching,
    lastUpdated,
    data: students,
  } = studentsByEntity[selectedParent] || {
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
