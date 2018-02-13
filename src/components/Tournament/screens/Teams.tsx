import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';

import TeamsCard from '../cards/Teams';

// Define the property types
interface TournamentTeamsProps {
  match: {
    params: {
      event_code: string;
    }
  }
}

export default class TournamentTeams extends Component<TournamentTeamsProps> {

  // The render function will render the component
  public render() {
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <TeamsCard
          eventCode={this.props.match.params.event_code}
        />
      </div>
    );
  }

}
