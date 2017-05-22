/* eslint max-len: [2, 500, 4] */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { FileFileUpload } from 'material-ui/svg-icons';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import { selectLocation } from '../../../../actions/location';
import LocationContainer from '../../../../containers/location';

class LocationShow extends Component {

  static renderGroup(data) {
    return data && data.group ?
      data.group.map(item => <TableRow key={item.id} displayBorder={false}>
        <TableRowColumn>
          <Subheader>
            {data.name} {item.name}
          </Subheader>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/activity`}>Actividades</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/document`}>Documentos</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/newsletter`}>Anuncios</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/parent`}>Padres</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/student`}>Estudiantes</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/upload`} className="pull-right">
            <FileFileUpload />
          </Link>
        </TableRowColumn>
      </TableRow>)
      : null;
  }

  static renderGrade(data) {
    return data && data.grade ?
      data.grade.map(item => <Table selectable={false} key={item.id}>
        <TableBody displayRowCheckbox={false} stripedRows>
          {LocationShow.renderGroup(item)}
        </TableBody>
      </Table>) : null;
  }

  static renderLevels(data) {
    return data && data.level ? data.level.map(item => <div key={item.id}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={item.name} />
        </ToolbarGroup>
      </Toolbar>
      {LocationShow.renderGrade(item)}
    </div>) : null;
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(selectLocation(params.locationId));
  }

  render() {
    const { location } = this.props;
    return (<div>
      {LocationShow.renderLevels(location)}
    </div>);
  }
}

LocationShow.propTypes = {
  location: PropTypes.shape({}).isRequired,
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default LocationContainer(LocationShow);
