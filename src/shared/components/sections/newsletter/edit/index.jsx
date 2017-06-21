/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';

import NewsletterForm from '../form';
import NewsletterContainer from '../../../../containers/newsletter';
import { getNewsletter, updateNewsletter } from '../../../../actions/newsletter';

class NewsletterEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getNewsletter(params.newsletterId));
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/newsletter?success`);
    }
  }

  actionHandler(newsletterId, data) {
    const { dispatch } = this.props;
    dispatch(updateNewsletter(newsletterId, data));
  }

  render() {
    const { newsletter, lastUpdated } = this.props;
    return _.isEmpty(newsletter) ? <LinearProgress mode="indeterminate" /> : (<div>
      <NewsletterForm
        action={this.actionHandler}
        groupId={newsletter.groupId}
        newsletter={newsletter}
        lastUpdated={lastUpdated}
        title="Editar Noticia"
      />
    </div>);
  }
}

NewsletterEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  newsletter: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

NewsletterEdit.defaultProps = {
  newsletter: {},
  lastUpdated: null,
  groupId: null,
};


export default NewsletterContainer(NewsletterEdit);
