import React, { Component } from 'react';
import { RootState, actions } from '../../core';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { Typography, Grid, ButtonBase, Button, IconButton } from 'material-ui';
import PeopleIcon from 'material-ui-icons/People';
import GamepadIcon from 'material-ui-icons/Gamepad';
import FormatListNumberedIcon from 'material-ui-icons/FormatListNumbered';

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
  goToPage: (code: string, page?: string) => void;
}

class TournamentItem extends Component<TournamentItemProps> {
  render() {
    let address;
    let { event } = this.props;
    if (event.location) {
      address = <p>{event.location.address}</p>;
    }
    return (
      <Card style={styles.card}>
        <CardContent onClick={() => this.props.goToPage(event.code)}>
          <Typography variant="headline">
            {event.name}
          </Typography>
          <Typography variant="subheading">
            {address}
          </Typography>
          <Typography variant="body1">
            {event.description}
          </Typography>
          <br />
          <Typography variant="body2">
            {new Date(event.start).toDateString()} - {new Date(event.end).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => this.props.goToPage(event.code)}>
            View Event
          </Button>
          <span style={{ margin: 'auto' }}/>
          <IconButton aria-label="Matches" onClick={() => this.props.goToPage(event.code, 'matches')}>
            <GamepadIcon />
          </IconButton>
          <IconButton aria-label="Rankings" onClick={() => this.props.goToPage(event.code, 'rankings')}>
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton aria-label="Teams" onClick={() => this.props.goToPage(event.code, 'teams')}>
            <PeopleIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    goToPage: (code: string, page?: string) => {
      dispatch(push('/event/'+ code + (page ? ('/' + page) : '')));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentItem);