import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

// cartReducer - receives state and action which contains action type and payload

// switch statement to handle cart action types
// set cart items updates cart state
// set is cart open updates state of cart dropdown - open or closed
// remove cart items sets cart state back to initial state
// default returns state without updating

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.REMOVE_ALL_CART_ITEMS:
      return CART_INITIAL_STATE;
    default:
      return state;
  }
};
