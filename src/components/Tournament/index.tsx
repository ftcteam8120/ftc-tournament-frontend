// Import the base Component class from React
import React, { Component } from 'react';
import { Redirect } from 'react-router';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../../core';
import MediaQuery from 'react-responsive';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Import the stylesheet for this component
import './index.less';

// Import other components
import NavBar from '../NavBar';
import TournamentTitleBar from '../TournamentTitleBar';

// Define the property types
interface TournamentProps {
  match: {
    params: {
      id: string;
    }
  }
  data: any;
}

// Define the state types
interface TournamentState {}

class Tournament extends Component<TournamentProps, TournamentState> {

  // The render function will render the component
  public render() {
    const { errors, loading, event } = this.props.data;
    return (
      <div className="tournament">
        <TournamentTitleBar event={event} loading={loading} />
        {this.props.children}
        <MediaQuery query="(max-width: 800px)">
          <NavBar />
        </MediaQuery>
      </div>
    );
  }

}

export default graphql<any, any>(gql`
  query EventQuery($id: String!) {
    event(id: $id) {
      id
      name
      shortid
    }
  }
`, {
  options: (props: TournamentProps) => ({
    variables: { id: props.match.params.id }
  })
})(Tournament);
