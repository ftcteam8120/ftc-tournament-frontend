// Import the base Component class from React
import React, { Component } from 'react';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../../core';

// Import the stylesheet for this component
import './index.less';

// Import other components
import NavBar from '../NavBar';

// Define the property types
interface AppProps {
  authenticated: boolean;
  login: (username: string, password: string) => Action;
  logout: () => Action;
}

// Define the state types
interface AppState {}

class App extends Component<AppProps, AppState> {

  private getRandomImage(): string {
    let index: number;
    index = Math.floor(Math.random() * 5 + 1);
    return ("linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/img/background/bg" + index + ".jpg')");
  }
  // The render function will render the component
  public render() {
    return (
      <div className="app" style={{ backgroundImage: this.getRandomImage() }}>
        <NavBar />
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
