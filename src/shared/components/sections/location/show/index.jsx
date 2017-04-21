/* eslint max-len: [2, 500, 4] */

import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';

import LocationContainer from '../../../../containers/location';

class LocationShow extends Component {

  static renderLocation(location) {
    console.log('location', location);
    return null;
  }

  render() {
    const { location, isFetching, lastUpdated, selectedLocation } = this.props;
    console.log('isFetching', isFetching, 'lastUpdated', lastUpdated, 'selectedLocation', selectedLocation);
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
  selectedLocation: PropTypes.string.isRequired,
};

LocationShow.defaultProps = {
  lastUpdated: null,
};

export default LocationContainer(LocationShow);
