import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, documentsByGroup } = state;
  const {
    isFetching,
    lastUpdated,
    data: documents,
  } = documentsByGroup[selectedGroup] || {
    isFetching: true,
    data: [],
  };

  return {
    selectedGroup,
    isFetching,
    lastUpdated,
    documents,
  };
};

export default connect(mapStateToProps);
