import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';
import { graphql } from 'react-apollo';
import { push } from 'react-router-redux';
import gql from 'graphql-tag';
import { Toolbar, Typography, Grid } from 'material-ui';

import './index.less';

const styles = {
  view: {
    marginTop: 80,
    marginLeft: 16,
    marginRight: 16
  }
};

import TitleBar from '../TitleBar';
import TournamentItem from './TournamentItem';

// Define the property types
interface TournamentsProps {
  data: any;
  openEvent: (shortid: string) => void;
}

interface TournamentsState {}

class Tournaments extends Component<TournamentsProps, TournamentsState> {

  // The render function will render the component
  public render() {
    let { errors, loading, events } = this.props.data;
    if (loading) events = [];
    return (
      <div style={styles.view}>
        <TitleBar>
          <Typography variant="title" color="inherit">
            FTC Tournaments
          </Typography>
        </TitleBar>
        <Grid container spacing={16} justify="center">
          {events.map((event) =>
            <TournamentItem
              onClick={() => this.props.openEvent(event.shortid)}
              key={event.id}
              event={event}
            />  
          )}
          </Grid>  
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
  query EventsQuery {
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
`)(Tournaments));
