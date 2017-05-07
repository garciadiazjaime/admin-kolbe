/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import NewsletterForm from '../form';
import NewsletterContainer from '../../../../containers/newsletter';
import { saveNewsletter } from '../../../../actions/newsletter';

class NewsletterAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/newsletter?success`);
    }
  }

  actionHandler(groupId, data) {
    const { dispatch } = this.props;
    dispatch(saveNewsletter(groupId, data));
  }

  render() {
    const { params } = this.props;
    return (<div className="container-fluid">
      <NewsletterForm action={this.actionHandler} groupId={params.groupId} />
    </div>);
  }
}

NewsletterAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

NewsletterAdd.defaultProps = {
  lastUpdated: null,
  groupId: null,
};

export default NewsletterContainer(NewsletterAdd);
