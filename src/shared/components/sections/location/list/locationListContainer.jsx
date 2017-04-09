import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { fetchLocationsIfNeeded } from '../../../../actions';
import LocationList from './locationList';

class LocationListContainer extends Component {

  constructor(props) {
    super(props);
    console.log('LocationListContainer:constructor', props);
  }

  componentDidMount() {
    const { dispatch, selectedSchool } = this.props;
    dispatch(fetchLocationsIfNeeded(selectedSchool));
  }

  render() {
    const { locations, isFetching, lastUpdated } = this.props;
    console.log('isFetching', isFetching, 'lastUpdated', lastUpdated);
    return (<LocationList locations={locations} />);
  }
}

LocationListContainer.propTypes = {
  selectedSchool: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

LocationListContainer.defaultProps = {
  dispatch: {},
  lastUpdated: null,
};

const mapStateToProps = (state) => {
  const { selectedSchool, locationsBySchool } = state;
  const {
    isFetching,
    lastUpdated,
    items: locations,
  } = locationsBySchool[selectedSchool] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSchool,
    locations,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps)(LocationListContainer);
