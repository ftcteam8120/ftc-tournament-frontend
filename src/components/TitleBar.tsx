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
import MediaQuery from 'react-responsive';
import { AppBar, Typography, Toolbar, IconButton, Button } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

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
  style?: any;
  title?: string;
  elevation?: number;
  titleComponent?: any;
  position?: string;
  logout: () => void;
  back: () => void;
  replace: (url: string) => void;
  goToLogin: () => void;
}

// Define the state types
interface TitleBarState {
  anchorEl: any;
}

class TitleBar extends Component<TitleBarProps, TitleBarState> {

  constructor(props: TitleBarProps) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  back() {
    if (this.props.backTo) {
      this.props.replace(this.props.backTo);
    } else {
      this.props.back();
    }
  }
  
  public render() {
    const open = Boolean(this.state.anchorEl);
    let elevation = 2;
    if (this.props.elevation != undefined) elevation = this.props.elevation;
    return (
      <AppBar position={this.props.position as any || "fixed"} color="primary" style={this.props.style} elevation={elevation}>
        <Toolbar>
          {this.props.showBack ? (
            <IconButton style={styles.menuButton} onClick={() => this.back()} color="inherit" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
          ) : (
              <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            )}
          <Typography variant="title" color="inherit">{this.props.title}</Typography>
          <span style={{ display: 'flex', flex: 1 }}>
            {this.props.titleComponent}  
          </span>
          <MediaQuery query="(min-width: 601px)">
            {this.props.authenticated ? (
              <div style={styles.currentUser}>
                <Button color="inherit" onClick={() => {}}>My Account</Button>
                <Button color="inherit" onClick={() => this.props.logout()}>Logout</Button>
              </div>
            ) : (
              <div style={styles.currentUser}>
                <Button color="inherit" onClick={() => this.props.goToLogin()}>Login</Button>
                <Button color="inherit" onClick={() => { }}>Signup</Button>
              </div>
            )}
          </MediaQuery>
          <MediaQuery query="(max-width: 600px)">
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={(event) => this.handleMenu(event)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => this.handleClose()}
            >
              {this.props.authenticated ? (
                <div>
                  <MenuItem onClick={() => {}}>My Account</MenuItem>
                  <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => this.props.goToLogin()}>Login</MenuItem>
                  <MenuItem onClick={() => this.props.logout()}>Signup</MenuItem>
                </div>
              )}  
            </Menu>
          </MediaQuery>
        </Toolbar>
        {this.props.children}
      </AppBar>
    );
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
