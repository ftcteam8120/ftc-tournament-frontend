// Import the base Component class from React
import React, { Component } from 'react';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { push, goBack, replace } from 'react-router-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AppBar, Typography, Toolbar, IconButton, Button } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  currentUser: {
    display: 'flex'
  }
};

// Define the property types
interface TitleBarProps {
  user: any;
  authenticated: boolean;
  showBack?: boolean;
  backTo?: string;
  logout: () => void;
  back: () => void;
  replace: (url: string) => void;
  goToLogin: () => void;
}

// Define the state types
interface TitleBarState {}

class TitleBar extends Component<TitleBarProps, TitleBarState> {

  back() {
    if (this.props.backTo) {
      this.props.replace(this.props.backTo);
    } else {
      this.props.back();
    }
  }
  
  public render() {
    let currentUser;
    if (this.props.authenticated) {
      currentUser = (
        <div style={styles.currentUser}>
          <Button color="inherit" onClick={() => {}}>Account</Button>
          <Button color="inherit" onClick={() => this.props.logout()}>Logout</Button>
        </div>
      );
    } else {
      currentUser = (
        <div style={styles.currentUser}>
          <Button color="inherit" onClick={() => this.props.goToLogin()}>Login</Button>
          <Button color="inherit" onClick={() => { }}>Signup</Button>
        </div>
      );
    }
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          {this.props.showBack ? (
            <IconButton style={styles.menuButton} onClick={() => this.back()} color="inherit" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
          ): (
            <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          )}
          <div style={styles.flex}>
            {this.props.children}  
          </div>
          {currentUser}
        </Toolbar>
      </AppBar>
    )
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.auth.logout());
    },
    goToLogin: () => {
      dispatch(push('/login'));
    },
    back: () => {
      dispatch(goBack());
    },
    replace: (url: string) => {
      dispatch(replace(url));
    }
  };  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);
