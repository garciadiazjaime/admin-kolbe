import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { ContentClear } from 'material-ui/svg-icons';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import NewsletterContainer from '../../../../containers/newsletter';
import { getNewsletter } from '../../../../actions/newsletter';

class NewsletterShow extends Component {

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getNewsletter(params.newsletterId));
  }

  render() {
    const { newsletter, params } = this.props;
    return _.isEmpty(newsletter) ? <LinearProgress mode="indeterminate" /> : (<Card>
      <Link to={`/parent/${params.parentId}/group/${params.groupId}/newsletter`} className="pull-right">
        <ContentClear />
      </Link>
      <div className="clearfix" />
      <CardTitle title="Noticia" />

      <CardTitle subtitle="Nombre">
        <CardText>
          {newsletter.name}
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Descripción">
        <CardText>
          {newsletter.description}
        </CardText>
      </CardTitle>

      <CardTitle subtitle="Fecha">
        <CardText>
          {moment(newsletter.date).format('DD/MM/YYYY')}
        </CardText>
      </CardTitle>
    </Card>);
  }
}

NewsletterShow.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  newsletter: PropTypes.shape({}),
};

NewsletterShow.defaultProps = {
  newsletter: {},
};

export default NewsletterContainer(NewsletterShow);
