import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup } = state;

  return {
    selectedGroup,
  };
};

export default connect(mapStateToProps);
