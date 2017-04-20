/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';

import LocationContainer from '../../../../containers/location';

// import { fetchLocationIfNeeded } from '../../../../actions/location';

class LocationShow extends Component {

  static renderLocation(location) {
    console.log('location', location);
    return null;
  }

  constructor(props) {
    super(props);
    console.log('LocationShowContainer:constructor', props);
  }

  componentDidMount() {
    // const { dispatch, params } = this.props;
    // dispatch(fetchLocationIfNeeded(params.locationId));
  }

  render() {
    const { location, isFetching, lastUpdated } = this.props;
    console.log('isFetching', isFetching, 'lastUpdated', lastUpdated);
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre del Plantel</th>
                <th>Ver</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {LocationShow.renderLocation(location)}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
  }
}

LocationShow.propTypes = {
  location: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};

// params: PropTypes.shape({}).isRequired,
// dispatch: PropTypes.func.isRequired,
// dispatch: {},

LocationShow.defaultProps = {
  lastUpdated: null,
};

export default LocationContainer(LocationShow);
