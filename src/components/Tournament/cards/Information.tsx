import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, CardContent, Typography, IconButton, CardMedia, CircularProgress, Grid } from 'material-ui';

import { Event } from '../../../core/types';

const styles = {
  card: {
    display: 'flex'
  },
  media: {
    height: 'calc(100% - 32px)',
    backgroundSize: 'contain',
    width: 300,
    margin: 16
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    marginTop: 120
  }
};

interface Props {
  eventCode: string;
}

interface Response {
  event: Event;
}

class InformationCard extends Component<ChildProps<Props, Response>> {

  // The render function will render the component
  public render() {
    const { error, loading, event } = this.props.data;
    let address;
    let logo;
    if (!loading) {
      if (event.location) {
        address = <p>{event.location.address}</p>;
      }
      if (event.logo_url) {
        logo = (
          <CardMedia
            style={styles.media}
            image={event.logo_url}
            title="Event Logo"
          />
        );
      }
    }
    return (
      <Card style={{ height: 300 }}>
        {loading ? (
          <div style={styles.progressContainer as any}>
            <CircularProgress style={styles.progress} size={64} />  
          </div>
        ) : (
          <div style={styles.card}>
            <MediaQuery query="(min-width: 600px)">
              {logo}
            </MediaQuery>
            <CardContent>
              <Typography variant="display1" color="default">{event.name}</Typography>
              <Typography variant="subheading" color="default">
                {address}
              </Typography>
              <Typography variant="body1">
                {event.description}
              </Typography>
              <br/>  
              <Typography variant="body2">
                {new Date(event.start).toDateString()} - {new Date(event.end).toDateString()}
              </Typography>  
            </CardContent>
          </div>
        )}
      </Card>
    );
  }

}

export default graphql<any, any>(gql`
  query InformationCardQuery($code: String) {
    event(code: $code) {
      id
      name
      logo_url
      description
      start
      end
      location {
        address
      }
      sponsors {
        name
        logo_url
        type
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: {
      code: props.eventCode
    }
  })
})(InformationCard);
