// Export reducers and actions
export * from './reducers';
export * from './actions';
// Import the initial states
import { AuthState } from './reducers/auth';
// Interface to hold the root state types (Typescript only)
export interface RootState {
  auth: AuthState;
}
