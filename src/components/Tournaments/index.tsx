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
  openEvent: (code: string) => void;
}

interface TournamentsState {}

class Tournaments extends Component<TournamentsProps, TournamentsState> {

  // The render function will render the component
  public render() {
    let { errors, loading, events } = this.props.data;
    if (loading) events = [];
    return (
      <div style={styles.view}>
        <TitleBar title="FTC Tournaments"/>
        <Grid container spacing={16}>
          {events.map((event) =>
          <Grid item key={event.id} md={6} sm={6} xs={12} lg={4} xl={3}>  
            <TournamentItem
              onClick={() => this.props.openEvent(event.code)}
              event={event}
              />
            </Grid>  
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
    openEvent: (code: string) => {
      dispatch(push('/event/'+ code));
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
