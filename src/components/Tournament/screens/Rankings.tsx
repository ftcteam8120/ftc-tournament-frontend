import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';

import RankingsCard from '../cards/Rankings';

// Define the property types
interface TournamentRankingsProps {
  match: {
    params: {
      id: string;
    }
  }
}

export default class TournamentRankings extends Component<TournamentRankingsProps> {

  // The render function will render the component
  public render() {
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <RankingsCard eventId={this.props.match.params.id}/>
      </div>
    );
  }

}
