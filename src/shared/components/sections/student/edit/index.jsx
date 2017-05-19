/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import StudentForm from '../form';
import StudentContainer from '../../../../containers/student';
import { getStudent, updateStudent } from '../../../../actions/student';

class StudentEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params, selectedGroup } = this.props;
    if (!selectedGroup) {
      browserHistory.push('/');
    }
    dispatch(getStudent(params.studentId));
  }

  componentWillReceiveProps(nextProps) {
    const { selectedGroup, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${selectedGroup}/student?success`);
    }
  }

  actionHandler(studentId, data) {
    const { dispatch } = this.props;
    dispatch(updateStudent(studentId, data));
  }

  render() {
    const { student, lastUpdated, selectedGroup } = this.props;
    return _.isEmpty(student) ? <LinearProgress mode="indeterminate" /> : (<div className="container-fluid">
      <StudentForm action={this.actionHandler} groupId={selectedGroup} student={student} lastUpdated={lastUpdated} />
    </div>);
  }
}

StudentEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  student: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  selectedGroup: PropTypes.string,
};

StudentEdit.defaultProps = {
  student: {},
  lastUpdated: null,
  selectedGroup: null,
};


export default StudentContainer(StudentEdit);
