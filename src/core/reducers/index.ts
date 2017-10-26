// Import the reducer combiner from redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import all of the separate reducers below
import { auth } from './auth';

const reducers = {
  auth
};
// Export the combined reducers
export const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer
});
