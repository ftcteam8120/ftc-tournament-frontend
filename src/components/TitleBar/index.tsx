// Import the base Component class from React
import React, { Component } from 'react';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../../core';
import MediaQuery from 'react-responsive';

// Import the stylesheet for this component
import './index.less';

import Navigation from '../Navigation';
import NavButton from '../Navigation/NavButton';

// Define the property types
interface TitleBarProps {
  user: any;
  logout: () => void;
}

// Define the state types
interface TitleBarState {}

class TitleBar extends Component<TitleBarProps, TitleBarState> {
  
  public render() {
    return (
      <div className="titlebar">
        <div className="titlebar-container">
          <div className="info">
            <h5>{this.props.user.profile.displayName} &nbsp;
            <a onClick={() => {}}>View Account</a> &nbsp;  
              <a onClick={() => this.props.logout()}>Logout</a>
            </h5>
            <div className="tournament-title">
              <NavButton
                white
                hideLabel
                link="/tournaments"
                icon="back"
              />
              {/*<h2 className="general-title">Kirtland FTC Scrimmage</h2>*/}
              <div className="open-section-title">
                <h3>Matches</h3>
                <h5>Kirtland FTC Scrimmage</h5>
              </div>
            </div>
          </div>
          <MediaQuery query="(min-width: 801px)">
            <Navigation/>
          </MediaQuery>
        </div>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  user: state.auth.user
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.auth.logout());
    }
  };  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);
