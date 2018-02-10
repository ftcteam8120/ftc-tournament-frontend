import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { CircularProgress, Grid } from 'material-ui';

import { Event, Match } from '../../../../core/types';

const styles = {
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    marginTop: 120
  }
};

import TeamItem from './TeamItem';

interface Props {
  eventId: string;
  openTeam: (number: number) => void;
}

interface Response {
  event: Event;
}

class TeamsCard extends Component<ChildProps<Props, Response>> {

  public render() {
    const { error, loading, event } = this.props.data;
    return (
      <div style={{ width: '100%' }}>
        {loading ? (
          <div style={styles.progressContainer as any}>
            <CircularProgress style={styles.progress} size={64} />  
          </div>
        ) : (
          <Grid container spacing={16}>
            {event.teams.map((team) => (
              <Grid item key={team.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <TeamItem team={team} onClick={() => this.props.openTeam(team.number)}/>
              </Grid>
            ))}
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
    openTeam: (number: number) => {
      dispatch(push('/team/'+number));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql<Response, Props>(gql`
  query TeamsCardQuery($id: String!) {
    event(id: $id) {
      id
      teams {
        id
        shortid
        name
        number
        affiliation
        city
        state
        country
        website
        photo_url
        banner_url
        colors {
          primary
          secondary
        }
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: { id: props.eventId }
  })
})(TeamsCard));