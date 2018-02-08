import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from 'material-ui';

import { Team } from '../../../../core/types';

const styles = {
  root: {
    height: 200,
    minWidth: 250
  }
}

interface Props {
  team: Team;
  onClick?: () => void;
}

export default class TeamItem extends Component<Props> {
  render() {
    const { team } = this.props;
    return (
      <Card style={styles.root}>
        <CardContent>
          <Typography variant="headline">{team.number}</Typography>
          <Typography variant="title">{team.name}</Typography>
          <Typography variant="subheading">{team.affiliation}</Typography>
          <Typography variant="body1">{team.city}, {team.state} {team.country}</Typography>
        </CardContent>
      </Card>
    );
  }
}