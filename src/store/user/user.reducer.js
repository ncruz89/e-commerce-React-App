import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

// userReducer - receives state and action which contains action type and payload
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  // switch statement to handle user action types
  // either returns state with updated user or returns state
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
