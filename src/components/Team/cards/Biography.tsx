import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, CardContent, Typography, IconButton, CardMedia, CircularProgress, Grid } from 'material-ui';

import Loading from '../../Loading';
import { Team } from '../../../core/types';

interface Props {
  teamNumber: string;
}

interface Response {
  team: Team;
}

class BiographyCard extends Component<ChildProps<Props, Response>> {

  // The render function will render the component
  public render() {
    const { error, loading, team } = this.props.data;
    return (
      <Card style={{ minHeight: 200 }}>
        {loading ? (
          <Loading/>
        ) : (
          <div>
            <CardContent>
              <Typography variant="headline">Biography</Typography>
              <Typography variant="body1">{team.biography}</Typography>  
            </CardContent>
          </div>
        )}
      </Card>
    );
  }

}

export default graphql<any, any>(gql`
  query BiographyCardQuery($number: Int) {
    team(number: $number) {
      id
      biography
    }
  }
`, {
  options: (props: Props) => ({
    variables: { number: props.teamNumber }
  })
})(BiographyCard);
