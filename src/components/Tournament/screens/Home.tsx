import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from 'material-ui';

import InformationCard from '../cards/Information';
import MapCard from '../cards/Map';
import MatchesCard from '../cards/Matches';

// Define the property types
interface TournamentHomeProps {
  match: {
    params: {
      event_code: string;
    }
  }
  data: any;
}

export default class TournamentHome extends Component<TournamentHomeProps> {
 
  // The render function will render the component
  public render() {
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={8}>
            <InformationCard
              eventCode={this.props.match.params.event_code}
            />
          </Grid>  
          <Grid item xs={12} sm={12} md={4}>
            <MapCard
              eventCode={this.props.match.params.event_code}
            />
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <MatchesCard
            eventCode={this.props.match.params.event_code}
          />
        </Grid>
      </div>
    );
  }

}
