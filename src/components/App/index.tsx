import React, { Component } from 'react';
import { Redirect } from 'react-router';

// Import the stylesheet for this component
import './index.less';

interface AppProps {}

interface AppState {}

export default class App extends Component<AppProps, AppState> {

  // The render function will render the component
  public render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }

}
