import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import SchoolContainer from '../../../containers/school';
import style from './style.scss';

class Dashboard extends Component {

  static renderLocations(data) {
    return data.map(item => <RaisedButton key={item.id} className={style.button}>
      <Link to={`/location/${item.id}`} className={style.anchor}>{item.name}</Link>
    </RaisedButton>);
  }

  render() {
    const { locations } = this.props;
    return (<div className="text-center">
      {Dashboard.renderLocations(locations)}
    </div>);
  }
}

Dashboard.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SchoolContainer(Dashboard);
