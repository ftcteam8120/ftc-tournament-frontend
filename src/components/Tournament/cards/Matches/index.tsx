import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { Event, Match } from '../../../../core/types';

import LocationMap from '../../../LocationMap';
import MatchItem from './MatchItem';

import './index.less';

interface Props {
  eventId: string;
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

  onExpand(panel) {
    this.setState({
      expanded: panel
    });
  }

  public render() {
    const { error, loading, event } = this.props.data;
    let qualifying: Match[] = [];
    let semifinal: Match[] = [];
    let final: Match[] = [];
    if (!loading) {
      let groups = _.groupBy(event.matches, 'type');
      qualifying = groups.QUALIFYING;
      semifinal = groups.SEMIFINAL;
      final = groups.FINAL;
    }
    return (
      <div style={{ width: '100%' }}>
        {loading ? null : (
          <div>
            {final.map((match, index) => (
              <MatchItem
                key={match.id}
                eventId={this.props.eventId}
                match={match}
                expanded={this.state.expanded === match.id}
                onExpand={() => this.onExpand(match.id)}
              />
            ))}
            {semifinal.map((match, index) => (
              <MatchItem
                key={match.id}
                eventId={this.props.eventId}
                match={match}
                expanded={this.state.expanded === match.id}
                onExpand={() => this.onExpand(match.id)}
              />
            ))}
            {qualifying.map((match, index) => (
              <MatchItem
                key={match.id}
                eventId={this.props.eventId}
                match={match}
                expanded={this.state.expanded === match.id}
                onExpand={() => this.onExpand(match.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

}

export default graphql <Response, Props>(gql`
  query MatchesCardQuery($id: String!) {
    event(id: $id) {
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
    variables: { id: props.eventId }
  })
})(MatchesCard);
