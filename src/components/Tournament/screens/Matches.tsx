import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import MatchesCard from '../cards/Matches';

// Define the property types
interface TournamentMatchesProps {
  match: {
    params: {
      id: string;
    }
  }
  data: any;
}

export default class TournamentMatches extends Component<TournamentMatchesProps> {

  // The render function will render the component
  public render() {
    return (
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <MatchesCard eventId={this.props.match.params.id} />
      </div>
    );
  }

}
