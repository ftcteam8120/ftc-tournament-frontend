import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';
import { theme } from '../../theme';
import { Typography, CircularProgress, AppBar, Toolbar } from 'material-ui';

import Loading from '../Loading';

const styles = {
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw'
  },
  caption: {
    position: 'absolute',
    width: '100%',
    bottom: 16,
    textAlign: 'center'
  }
}

interface LoadingScreenProps {
  loading: boolean;
  auth: () => Action;
}

interface LoadingScreenState { }

class LoadingScreen extends Component<LoadingScreenProps, LoadingScreenState> {
  
  // Wait until the component mounts to avoid issues later
  public componentDidMount() {
    // Check the authentication with the server
    this.props.auth();
  }

  public render() {
    // Only show the router if the auth has loaded
    let children;
    if (!this.props.loading) {
      return this.props.children;
    } else {
      return (
        <div style={styles.view as any}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Loading  
              </Typography>
            </Toolbar>
          </AppBar>
          <Loading/>
          <Typography variant="caption" style={styles.caption as any}>
            Created by FTC Team 8120, The Electric Hornets
          </Typography>
        </div>
      );
    }
  }

}

const mapStateToProps = (state: RootState) => ({
  loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    auth: () => {
      dispatch(actions.auth.auth());
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
