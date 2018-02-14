import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';
import { graphql } from 'react-apollo';
import { push } from 'react-router-redux';
import gql from 'graphql-tag';
import { Toolbar, Typography, Grid, CircularProgress } from 'material-ui';

import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';

const styles = {
  view: {
    marginTop: 80,
    marginLeft: 16,
    marginRight: 16
  }
};

import TitleBar from '../TitleBar';
import TournamentItem from './TournamentItem';
import Loading from '../Loading';

// Define the property types
interface TournamentsProps {
  data: any;
}

interface TournamentsState {}

class Tournaments extends Component<TournamentsProps, TournamentsState> {

  // The render function will render the component
  public render() {
    let { error, loading, events } = this.props.data;
    let content;
    if (loading || !events) events = [];
    if (error) {
      content = <ErrorState message="Error Loading Events" error={error} />;
    } else if (events.length === 0) {
      content = <EmptyState message="No Events Found"/>
    } else {
      content = (
        <Grid container spacing={16}>
          {events.map((event) =>
            <Grid item key={event.id} md={6} sm={12} xs={12} lg={4} xl={3}>
              <TournamentItem
                event={event}
              />
            </Grid>
          )}
        </Grid>
      );
    }
    return (
      <div style={styles.view}>
        <TitleBar title="FTC Tournaments"/>
        {loading ? (
          <Loading/>
        ) : content}
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
  query EventsQuery {
    events {
      id
      name
      code
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
`)(Tournaments));
