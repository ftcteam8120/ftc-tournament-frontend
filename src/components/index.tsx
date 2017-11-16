import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../core/store';
import { Provider } from 'react-redux';

// Export all of the components
export * from './App';

// Import all of the components
import App from './App';
import LoadingScreen from './LoadingScreen';
import Login from './Login';

import Tournament from './Tournament';

/*
 The primary root element of the app
 This element is reloaded when the hot loader detects
 changes in this file or any of it's dependencies
*/
export function Root({ store, history }) {
  // Returns JSX just like a component, but in the form of a function
  return (
    // The Redux provider to give access to the stores
    <Provider store={store}>
      <LoadingScreen>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          {/* The switch workjs just like a switch in javascript */}  
          <Switch>
            {/* We keep this outside the App component because unauthed users should be here */}  
            <Route exact path="/login" component={Login} />  
            {/* All app paths that require authentication go inside the app component */}
            <App>
              <Route path="/event/:id" component={Tournament}>
                {/*<Route path="/" component={Info} />*/}
              </Route>  
            </App>  
          </Switch>
        </ConnectedRouter>
      </LoadingScreen>
    </Provider>
  );
};
