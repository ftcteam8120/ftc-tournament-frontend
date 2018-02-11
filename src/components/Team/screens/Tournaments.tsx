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

const styles = {
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    marginTop: 120
  }
};

interface Props {
  match: {
    params: {
      id: string;
    }
  }
  openEvent: (shortid: string) => void;
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
          <div style={styles.progressContainer as any}>
            <CircularProgress style={styles.progress} size={64} />
          </div>
        ) : (
            <Grid container spacing={16}>
              {team.events.map((event) =>
                <Grid item key={event.id} md={6} sm={6} xs={12} lg={4} xl={3}>
                  <TournamentItem
                    onClick={() => this.props.openEvent(event.shortid)}
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
    openEvent: (shortid: string) => {
      dispatch(push('/event/'+ shortid));
    }
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
        name
        location {
          address
          description
        }
        description
        start
        end
        shortid
        logo_url
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: { number: props.match.params.id }
  })
})(TeamTournaments));
