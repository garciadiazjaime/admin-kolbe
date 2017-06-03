import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup } = state;
  console.log('state', state);

  return {
    selectedGroup,
  };
};

export default connect(mapStateToProps);
