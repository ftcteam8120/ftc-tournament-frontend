import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';

import './index.less';

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
        <div className="loading-screen">
          <img className="loading-logo" src="/img/loading.svg"/>
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
