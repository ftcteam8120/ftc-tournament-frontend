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

import EmptyState from '../../../EmptyState';
import ErrorState from '../../../ErrorState';

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
  eventCode: string;
  openTeam: (number: number) => void;
}

interface Response {
  event: Event;
}

class TeamsCard extends Component<ChildProps<Props, Response>> {

  public render() {
    const { error, loading, event } = this.props.data;
    let content;
    if (error || !event) {
      content = <ErrorState message="Error Loading Teams" error={error} />;
    } else if (event.teams.length === 0) {
      content = <EmptyState message="No Teams Found" />;
    } else {
      content = (
        <Grid container spacing={16}>
          {event.teams.map((team) => (
            <Grid item key={team.id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <TeamItem team={team} onClick={() => this.props.openTeam(team.number)} />
            </Grid>
          ))}
        </Grid>
      );
    }
    return (
      <div style={{ width: '100%' }}>
        {loading ? (
          <div style={styles.progressContainer as any}>
            <CircularProgress style={styles.progress} size={64} />  
          </div>
        ) : content}
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
  query TeamsCardQuery($code: String) {
    event(code: $code) {
      id
      teams {
        id
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
    variables: {
      code: props.eventCode
    }
  })
})(TeamsCard));
