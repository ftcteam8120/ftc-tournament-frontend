// Import the base Component class from React
import React, { Component } from 'react';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../../core';

// Import the stylesheet for this component
import './index.less';

// Define the property types
interface NavBarProps {}

// Define the state types
interface NavBarState {}

class NavBar extends Component<NavBarProps, NavBarState> {
  // The render function will render the component
  public render() {
    return (
      <div className="navbar">
        <div className="navbar-top">
          <img className="navbar-top-logo" src="/img/FIRST_logo.svg" />
        </div>
        <div className="navbar-bottom">
        </div>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {};  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
