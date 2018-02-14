import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../core';
import { push } from 'react-router-redux';
import { Toolbar, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia } from 'material-ui';

const styles = {
  view: {
    marginTop: 80,
    marginLeft: 16,
    marginRight: 16
  }
};

import { User } from '../core/types';

import TitleBar from './TitleBar';
import TeamItem from './Tournament/cards/Teams/TeamItem';

interface Props {
  user: User;
  push: (url: string) => void;
}

class Home extends Component<Props> {

  // The render function will render the component
  public render() {
    return (
      <div style={styles.view}>
        <TitleBar title="Home" />
        <Typography variant="display1" color="primary">
          Welcome to the FIRST Tech Challenge Tournament View App
        </Typography>
        <Typography variant="title" style={{ marginTop: 16 }}>
          Created by FTC Team 8120, The Electric Hornets
        </Typography>
        <div>
          <Grid container spacing={16} style={{ marginTop: 16 }}>
            <Grid item>
              <Card style={{ minHeight: 300, minWidth: 300 }}>
                <CardMedia
                  style={{ height: 200 }}
                  image="/img/background/bg2.jpg"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    Tournaments
                </Typography>
                  <Typography component="p">
                    View all tournaments
                </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium" color="primary" onClick={() => this.props.push('/events')}>
                    Let's Go
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card style={{ minHeight: 300, minWidth: 300 }}>
                <CardMedia
                  style={{ height: 200 }}
                  image="/img/background/bg5.jpg"
                />
                <CardContent>
                  <Typography variant="headline" component="h2">
                    Teams
                </Typography>
                  <Typography component="p">
                    View team information
                </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium" color="primary" onClick={() => this.props.push('/teams')}>
                    Let's Go
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url: string) => {
      dispatch(push(url));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
