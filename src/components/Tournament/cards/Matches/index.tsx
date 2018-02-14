import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { CircularProgress } from 'material-ui';

import { Event, Match } from '../../../../core/types';

import EmptyState from '../../../EmptyState';
import ErrorState from '../../../ErrorState';

import LocationMap from '../../../LocationMap';
import MatchItem from './MatchItem';
import Loading from '../../../Loading';

interface Props {
  eventCode: string;
}

interface State {
  expanded: string;
}

interface Response {
  event: Event;
}

class MatchesCard extends Component<ChildProps<Props, Response>, State> {

  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  onExpand(panel, expanded) {
    this.setState({
      expanded: expanded ? panel : false
    });
  }

  public render() {
    const { error, loading, event } = this.props.data;
    let matches: Match[] = [];
    if (!loading && !error && event) {
      let groups = _.groupBy(event.matches, 'type');
      matches = _.concat(groups.FINAL || [], groups.SEMIFINAL || [], groups.QUALIFYING || []);
    }
    let content;
    if (error) {
      content = <ErrorState message="Error Loading Matches" error={error}/>
    } else if (matches.length === 0 && !loading) {
      content = <EmptyState message="No Matches Found"/>
    } else {
      content = (
        <div>
          {matches.map((match, index) => (
            <MatchItem
              key={match.id}
              match={match}
              expanded={this.state.expanded === match.id}
              onExpand={(e, v) => this.onExpand(match.id, v)}
            />
          ))}
        </div>
      );
    }
    return (
      <div style={{ width: '100%' }}>
        {loading ? (
          <Loading/>
        ) : content}
      </div>
    );
  }

}

export default graphql <Response, Props>(gql`
  query MatchesCardQuery($code: String) {
    event(code: $code) {
      id
      matches(orderBy: { number: DESC, sub: DESC }) {
        id
        winner
        type
        number
        sub
        red_alliance {
          total
          auto
          auto_b
          tele
          end
          penalty
          teams {
            id
            name
            number
          }
        }
        blue_alliance {
          total
          auto
          auto_b
          tele
          end
          penalty
          teams {
            id
            name
            number
          }
        }
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: {
      code: props.eventCode
    }
  })
})(MatchesCard);
