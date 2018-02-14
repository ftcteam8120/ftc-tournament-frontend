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
import {
  Drawer,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Hidden,
  withStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import EventIcon from 'material-ui-icons/Event';
import HomeIcon from 'material-ui-icons/Home';
import PeopleIcon from 'material-ui-icons/People';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { closeDrawer } from '../core/actions/drawer';

import { User } from '../core/types';

const styles = theme => ({
  drawerHeader: {
    height: 120
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: 250,
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100%',
      zIndex: 10000
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

// Define the property types
interface AppDrawerProps {
  user: User;
  authenticated: boolean;
  mobileOpen: boolean;
  close: () => void;
  goToLogin: () => void;
  openLink: (url: string) => void;
  logout: () => void;
  classes: any;
}

// Define the state types
interface AppDrawerState {
  
}

class AppDrawer extends Component<AppDrawerProps, AppDrawerState> {
  
  public render() {
    const { classes } = this.props;
    let currentUser;
    if (this.props.authenticated) {
      currentUser = (
        <List>
          <ListItem>
            <Avatar>
              KB
            </Avatar>
            <ListItemText primary={this.props.user.profile.displayName} />
          </ListItem>
          <div style={{ display: 'flex', padding: 8 }}>
            <Button style={{ flexGrow: 1 }}>My Account</Button>
            <Button style={{ flexGrow: 1 }} onClick={() => this.props.logout()}>Logout</Button>
          </div>
        </List>
      );
    } else {
      currentUser = (
        <div style={{ display: 'flex', padding: 8 }}>
          <Button style={{ flexGrow: 1 }} onClick={() => this.props.goToLogin()}>Login</Button>
          <Button style={{ flexGrow: 1 }} onClick={() => this.props.logout()}>Signup</Button>
        </div>
      );
    }
    const drawer = (
      <div>
        {currentUser}
        {this.props.authenticated && (
          <div>
            <Divider />
            <List>
              <ListItem button onClick={() => this.props.openLink('/myteams')}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="My Teams" />
              </ListItem>
              <ListItem button onClick={() => this.props.openLink('/myevents')}>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="My Events" />
              </ListItem>
            </List>
          </div>
        )}
        <Divider />
        <List>
          <ListItem button onClick={() => this.props.openLink('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => this.props.openLink('/events')}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button onClick={() => this.props.openLink('/teams')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.props.mobileOpen}
            onClose={() => this.props.close()}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated,
  mobileOpen: state.drawer.open
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
    close: () => {
      dispatch(closeDrawer());
    },
    openLink: (url: string) => {
      dispatch(push(url));
      dispatch(closeDrawer());
    }
  };  
};

// Export the final connected class
export default withStyles(styles as any, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer) as any);
