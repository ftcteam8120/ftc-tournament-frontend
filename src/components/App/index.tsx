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
interface AppProps {
  authenticated: boolean;
  login: (username: string, password: string) => Action;
  logout: () => Action;
}

// Define the state types
interface AppState {}

class App extends Component<AppProps, AppState> {
  // The render function will render the component
  public render() {
    /*
    You can just type regular HTML here, but
    with expressions and slightly different syntax.
    More info at:
    https://facebook.github.io/jsx/
    */
    let intro = <h1>Hello, World!</h1>;
    return (
      <div className="app">
        {intro}
        {this.props.authenticated ? 'Logged in' : 'Logged out'}
        <div>
          <button onClick={() => this.props.login("kirkbrauer", "password")}>Login</button>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username: string, password: string) => {
      dispatch(actions.auth.login(username, password));
    },
    logout: () => {
      dispatch(actions.auth.logout());
    }
  };  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
