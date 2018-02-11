import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../core';
import { theme } from '../../theme';

// Import the stylesheet for this component
import './index.less';

import AppDrawer from '../AppDrawer';

interface AppProps {
  drawerOpen: boolean;
}

interface AppState {
  width: number;
}

class App extends Component<AppProps, AppState> {

  constructor(props) {
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

  // The render function will render the component
  public render() {
    return (
      <div style={{ display: 'flex' }}>
        <AppDrawer/>
        <div style={{ flexGrow: 1, marginLeft: this.state.width > theme.breakpoints.values.md ? 250 : 0 }}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  drawerOpen: state.drawer.open
});

// Export the final connected class
export default connect(
  mapStateToProps
)(App);
