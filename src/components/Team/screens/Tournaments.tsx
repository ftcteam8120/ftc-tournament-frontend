import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { CircularProgress, Grid } from 'material-ui';

import { Team, Match } from '../../../core/types';

import TournamentItem from '../../Tournaments/TournamentItem';
import Loading from '../../Loading';

interface Props {
  match: {
    params: {
      id: string;
    }
  }
}

interface Response {
  team: Team;
}

class TeamTournaments extends Component<ChildProps<Props, Response>> {

  public render() {
    const { error, loading, team } = this.props.data;
    let matches = [];
    if (!loading && !error) {
      matches = team.matches;
    }
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        {loading ? (
          <Loading/>
        ) : (
            <Grid container spacing={16}>
              {team.events.map((event) =>
                <Grid item key={event.id} md={6} sm={6} xs={12} lg={4} xl={3}>
                  <TournamentItem
                    event={event}
                  />
                </Grid>
              )}
            </Grid>
          )}
      </div>
    );
  }

}

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = (dispatch) => {
  return {
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql<any, any>(gql`
  query TeamMatchesQuery($number: Int) {
    team(number: $number) {
      id
      events {
        id
        code
        name
        location {
          address
          description
        }
        description
        start
        end
        logo_url
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: { number: props.match.params.id }
  })
})(TeamTournaments));
