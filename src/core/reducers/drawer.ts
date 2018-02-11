import {
  OPEN_DRAWER,
  CLOSE_DRAWER
} from '../actions/drawer';

export interface DrawerState {
  open: boolean;
}
// Define the initial state for the reducer if no state is provided
export const initialState: DrawerState = {
  open: false
};

export function drawer(state: DrawerState = initialState, action: any): DrawerState {
  switch (action.type) {
    case OPEN_DRAWER:
      return { open: true };
    case CLOSE_DRAWER:
      return { open: false };
    default:
      return state;  
  }
}