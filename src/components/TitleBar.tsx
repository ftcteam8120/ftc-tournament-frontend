// Import the base Component class from React
import React, { Component } from 'react';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { push, goBack, replace } from 'react-router-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../core';
import { openDrawer } from '../core/actions/drawer';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MediaQuery from 'react-responsive';
import { AppBar, Typography, Toolbar, IconButton, Button, withStyles } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { theme } from '../theme';

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
  openDrawer: () => void;
}

// Define the state types
interface TitleBarState {
  width: number;
}

class TitleBar extends Component<TitleBarProps, TitleBarState> {

  constructor(props: TitleBarProps) {
    super(props);
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => {
      this.updateWindowDimensions();
    });
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateWindowDimensions();
    });
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  back() {
    if (this.props.backTo) {
      this.props.replace(this.props.backTo);
    } else {
      this.props.back();
    }
  }
  
  public render() {
    let elevation = 2;
    const canGoBack = (window.history.length > 1);
    if (this.props.elevation != undefined) elevation = this.props.elevation;
    let appBarStyle;
    let menuButton;
    if (this.state.width > theme.breakpoints.values.md) {
      appBarStyle = {
        left: 250,
        width: `calc(100% - ${48}px)`
      };
    } else {
      menuButton = (
        <IconButton style={styles.menuButton} color="inherit" aria-label="Menu" onClick={() => this.props.openDrawer()}>
          <MenuIcon />
        </IconButton>
      );
    }
    return (
      <AppBar position={this.props.position as any || "fixed"} color="primary" style={{ ...appBarStyle, ...this.props.style }} elevation={elevation}>
        <Toolbar>
          {this.props.showBack && canGoBack ? (
            <IconButton style={styles.menuButton} onClick={() => this.back()} color="inherit" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
          ) : menuButton}
          <Typography variant="title" color="inherit">{this.props.title}</Typography>
          <span style={{ display: 'flex', flex: 1 }}>
            {this.props.titleComponent}  
          </span>
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
    },
    openDrawer: () => {
      dispatch(openDrawer());
    }
  };  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);
