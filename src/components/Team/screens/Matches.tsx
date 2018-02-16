import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { CircularProgress } from 'material-ui';

import { Team, Match } from '../../../core/types';

import MatchItem from '../../Tournament/cards/Matches/MatchItem';
import Loading from '../../Loading';

interface Props {
  match: {
    params: {
      id: string;
    }
  }
}

interface State {
  expanded: string;
}

interface Response {
  team: Team;
}

class TeamMatches extends Component<ChildProps<Props, Response>, State> {

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
    const { error, loading, team } = this.props.data;
    let matches = [];
    if (!loading && !error) {
      matches = team.matches;
    }
    let matchGroups = _.groupBy(matches, 'event.id');
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        {loading ? (
          <Loading/>
        ) : (
          <div>
            {Object.keys(matchGroups).map((key, index) => {
              return matchGroups[key].map((match) => (
                <MatchItem
                  key={match.id}
                  match={match}
                  expanded={this.state.expanded === match.id}
                  onExpand={(e, v) => this.onExpand(match.id, v)}
                />  
              ));
            })}
          </div>
        )}
      </div>
    );
  }

}

export default graphql <Response, Props>(gql`
  query TeamMatchesQuery($number: Int) {
    team(number: $number) {
      id
      matches {
        id
        winner
        type
        number
        sub
        event {
          id
          name
        }
        red_alliance {
          total
          auto
          auto_b
          tele
          end
          penalty
          surrogates {
            id
            name
            number
          }
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
          surrogates {
            id
            name
            number
          }
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
    variables: { number: props.match.params.id }
  })
})(TeamMatches);
