import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, CardContent, Typography, IconButton, CardMedia, CircularProgress } from 'material-ui';

import { Team } from '../../../core/types';

import LocationMap from '../../LocationMap';
import Loading from '../../Loading';

const styles = {
  root: {
    maxHeight: 300
  }
};

interface Props {
  teamNumber: string;
}

interface Response {
  team: Team;
}

class TeamMapCard extends Component<ChildProps<Props, Response>> {

  // The render function will render the component
  public render() {
    const { error, loading, team } = this.props.data;
    let map;
    if (!loading) {
      if (team.location) {
        if (team.location.coordinates) {
          let { lat, lng } = team.location.coordinates;
          map = (
            <LocationMap lat={lat} lng={lng} />
          );
        }
      }
    }
    return (
      <Card style={{ height: 300 }}>
        {loading ? (
          <Loading/>
        ) : map}
      </Card>
    );
  }

}

export default graphql<Response, Props>(gql`
  query MapCardQuery($number: Int) {
    team(number: $number) {
      id
      location {
        coordinates {
          lat
          lng
        }
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: { number: props.teamNumber }
  })
})(TeamMapCard);
