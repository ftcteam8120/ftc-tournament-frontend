import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { Typography, Grid, ButtonBase } from 'material-ui';

import { Event } from '../../core/types';

import './index.less';

let styles = {
  card: {
    minHeight: 200,
    cursor: 'pointer'
  }
};

interface TournamentItemProps {
  event: Event;
  onClick?: (event: any) => void;
}

export default class TournamentItem extends Component<TournamentItemProps> {
  render() {
    let address;
    if (this.props.event.location) {
      address = <p>{this.props.event.location.address}</p>;
    }
    return (
      <Card style={styles.card} onClick={this.props.onClick}>
        <CardContent>
          <Typography variant="headline">
            {this.props.event.name}
          </Typography>
          <Typography variant="subheading">
            {address}
          </Typography>
          <Typography variant="body1">
            {this.props.event.description}
          </Typography>
          <br />
          <Typography variant="body2">
            {new Date(this.props.event.start).toDateString()} - {new Date(this.props.event.end).toDateString()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}