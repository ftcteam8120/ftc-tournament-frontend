import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../core/store';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// Export all of the components
export * from './App';

// Import all of the components
import App from './App';
import Auth from './Auth';
import LoadingScreen from './LoadingScreen';
import Login from './Login';
import Tournaments from './Tournaments';
import Tournament from './Tournament';
import Team from './Team';
import MyEvents from './MyEvents';
import MyTeams from './MyTeams';

/*
 The primary root element of the app
 This element is reloaded when the hot loader detects
 changes in this file or any of it's dependencies
*/
export function Root({ store, client, history, theme }) {
  // Returns JSX just like a component, but in the form of a function
  return (
    // The Redux provider to give access to the stores
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <LoadingScreen>
            {/* ConnectedRouter will use the store from Provider automatically */}
            <ConnectedRouter history={history}>
              {/* The switch workjs just like a switch in javascript */}  
              <Switch>
                {/* We keep this outside the App component because unauthed users should be here */}  
                <Route exact path="/login" component={Login} />  
                {/* All app paths that require authentication go inside the app component */}
                <App>
                  <Route exact path="/events" component={Tournaments}/>
                  <Route path="/event/:id" component={Tournament} />
                  <Route path="/team/:id" component={Team} />
                  <Route path="/myevents" component={MyEvents} />
                  <Route path="/myteams" component={MyTeams}/>
                </App>  
              </Switch>
            </ConnectedRouter>
          </LoadingScreen>
        </ApolloProvider>  
      </MuiThemeProvider>
    </Provider>
  );
};
