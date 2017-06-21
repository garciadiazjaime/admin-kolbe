/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function renderLocation(data) {
  return data.map(item => <tr key={item._id}>
    <td>{item.name}</td>
    <td><Link to={`/location/${item._id}/edit`}><i className="glyphicon glyphicon-pencil" /></Link></td>
    <td><Link to={`/location/${item._id}/level`}><i className="glyphicon glyphicon-zoom-in" /></Link></td>
  </tr>);
}

export default function LocationList({ locations }) {
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
              <th>Editar</th>
              <th>Niveles</th>
            </tr>
          </thead>
          <tbody>
            {renderLocation(locations)}
          </tbody>
        </table>
      </div>
    </div>
  </div>);
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
};

LocationList.defaultProps = {
  locations: [],
};
