import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from 'material-ui';

import BiographyCard from '../cards/Biography';
import TeamMapCard from '../cards/Map';

// Define the property types
interface TeamHomeProps {
  match: {
    params: {
      id: string;
    }
  }
}

export default class TeamHome extends Component<TeamHomeProps> {

  // The render function will render the component
  public render() {
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={8} lg={7} xl={6}>
            <BiographyCard teamNumber={this.props.match.params.id} />  
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={5} xl={6}>
            <TeamMapCard teamNumber={this.props.match.params.id}/>  
          </Grid>  
        </Grid>  
      </div>
    );
  }

}
