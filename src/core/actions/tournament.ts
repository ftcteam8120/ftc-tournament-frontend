// Import the Action type (TypeScript only)
/*import { Action } from 'redux';
import { fidoAuth, fidoApi } from '../../utils/fido';
import { ThunkAction } from 'redux-thunk';
// Define the action constants
export const TOURNAMENT_LOADING = 'TOURNAMENT_LOADING';
export const TOURNAMENT_ERROR = 'TOURNAMENT_ERROR';
export const TOURNAMENT_SUCCESS = 'TOURNAMENT_SUCCESS';

export function loadTournament(id: string): any {
  return function (dispatch) {
    dispatch({
      type: TOURNAMENT_LOADING,
      id
    });
    return fidoApi('/tournament/' + id, { method: 'GET' }).then((data: any) => {
      dispatch({
        type: TOURNAMENT_SUCCESS,
        id,
        data
      });
    }).catch((err) => {
      dispatch({
        type: TOURNAMENT_ERROR,
        error: err
      });
    });
  }
}

// Login using a standard username and password
export function login(username: string, password: string): any {
  return function (dispatch) {
    // Dispatch the initial login action (sets loading to true)
    dispatch({ type: LOGIN });
    // Attempt to authenticate the user
    return fidoAuth('login', {
      method: 'post',
      body: {
        username,
        password
      }
    }, false /* Do not extract the data ).then((raw: any) => {
      // Set the token in the localStorage
      window.localStorage.token = raw.token;
      // Dispatch a success action
      dispatch(authSuccess(raw.data, raw.token));
    }).catch((err) => {
      dispatch(authFail());
    });
  }
}

// Logout the user
export function logout(): Action {
  // Clear the localStorage
  window.localStorage.token = null;
  return {
    type: LOGOUT
  };
}

// Export the action object
export let authActions = {
  login,
  logout,
  authSuccess,
  authFail,
  noAuth,
  auth
};*/
