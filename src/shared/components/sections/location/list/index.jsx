/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import LocationContainer from '../../../../containers/locationContainer';

import { fetchLocationsIfNeeded } from '../../../../actions';

class LocationList extends Component {

  static renderLocation(locations) {
    return (locations.map(item => <tr key={item._id}>
      <td>{item.name}</td>
      <td><Link to={`/location/${item._id}/level`}><i className="glyphicon glyphicon-zoom-in" /></Link></td>
      <td><Link to={`/location/${item._id}/edit`}><i className="glyphicon glyphicon-pencil" /></Link></td>
    </tr>));
  }

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
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Link to="/location/add" className="pull-right"><i className="glyphicon glyphicon-plus" /></Link>
        </div>
      </div>
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
              {LocationList.renderLocation(locations)}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
  }
}

LocationList.propTypes = {
  selectedSchool: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

LocationList.defaultProps = {
  dispatch: {},
  lastUpdated: null,
};

export default LocationContainer(LocationList);
