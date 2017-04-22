/* eslint max-len: [2, 500, 4] */

import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';

import LocationContainer from '../../../../containers/location';

class LocationShow extends Component {

  static renderLocation(location) {
    console.log('renderLocation', location);
    return null;
  }

  // componentDidMount() {
  //   const { dispatch, selectedSchool, selectedLocation } = this.props;
  //   dispatch(setLocation(selectedSchool, selectedLocation));
  // }

  render() {
    const { location } = this.props;
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
};

export default LocationContainer(LocationShow);
