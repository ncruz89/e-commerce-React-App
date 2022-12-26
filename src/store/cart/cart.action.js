import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

///////////// helper functions (business logic) for action creators /////////////

// addCartItem helper function for addItemToCart action
// receives cartItems and productToAdd object
// either returns updated cartItems with updated cartItem quantity if cartItem exists in cartItems
// or returns updated cartItems with productToAdd added to cartItems
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // **** need to optimize **** already retrieved index above...why map through again?
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// removeCartItem helper function for removeItemFromCart action
// receives cartItems and cartItemToRemove - searches cartItems to find if it contains cartItemToRemove
// returns cartItems after updating cartItem quantity
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart by calling clearCartItem helper function
  if (existingCartItem.quantity === 1) {
    return clearCartItem(cartItems, existingCartItem);
  }

  // **** need to optimize **** already retrieved index above...why map through again?
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// clearCartItem helper function for clearItemFromCart action
// simply filters out all cartItems besides the one whose remove button was clicked
// returns new array of filtered out cartItems
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

/////// cart action creators ///////////

// action for setting isCartOpen state
export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

// action for adding items to cart - retrieves newCartItems from addCartItem helper function above
// uses newCartItems for payload
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// action for removing item from cart - retrieves newCartItems from removeCartItem helper function above
// uses newCartItems for payload
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// action to clear item from cart (via minus quantity change in checkout-item component)
// retrieves newCartItems from clearCartItems helper function above
// uses newCartItems for payload
export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// action for removing all items from cart - simply sets cartItems back to inital state
export const removeAllItemsFromCart = () => {
  return createAction(CART_ACTION_TYPES.REMOVE_ALL_CART_ITEMS, []);
};
