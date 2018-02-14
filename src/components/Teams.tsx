import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../core';
import { push } from 'react-router-redux';
import { Toolbar, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia } from 'material-ui';

import EmptyState from './EmptyState';

const styles = {
  view: {
    marginTop: 80,
    marginLeft: 16,
    marginRight: 16
  }
};

import TitleBar from './TitleBar';
import TeamItem from './Tournament/cards/Teams/TeamItem';

export default class Teams extends Component {

  // The render function will render the component
  public render() {
    return (
      <div style={styles.view}>
        <TitleBar title="Teams" />
        <EmptyState message="Not Implemented"/>
      </div>
    );
  }
}