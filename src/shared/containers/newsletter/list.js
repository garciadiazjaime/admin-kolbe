import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, newslettersByGroup } = state;
  const {
    isFetching,
    lastUpdated,
    data: newsletters,
  } = newslettersByGroup[selectedGroup] || {
    isFetching: true,
    data: [],
  };

  return {
    selectedGroup,
    isFetching,
    lastUpdated,
    newsletters,
  };
};

export default connect(mapStateToProps);
