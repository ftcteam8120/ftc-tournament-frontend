// Import the base Component class from React
import React, { Component } from 'react';
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

import Navigation from '../Navigation';
import NavButton from '../Navigation/NavButton';
import TitleBar from '../TitleBar';

// Define the property types
interface TitleBarProps {
  event: any;
  authenticated: boolean;
  loading: boolean;
}

// Define the state types
interface TitleBarState {}

class TournamentTitleBar extends Component<TitleBarProps, TitleBarState> {
  
  public render() {
    return (
      <TitleBar>
        <div className="tournament-title-bar">
          <div className="tournament-title">
            <NavButton
              white
              hideLabel
              link="/events"
              icon="back"
            />
            {/*<h2 className="general-title">Kirtland FTC Scrimmage</h2>*/}
            <div className="open-section-title">
              <h3>Info</h3>
              <h5>{this.props.loading ? 'Loading' : this.props.event.name}</h5>
            </div>
          </div>
          <MediaQuery query="(min-width: 801px)">
            <Navigation />
          </MediaQuery>
        </div>
      </TitleBar>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {};  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentTitleBar);
