import { createSelector } from "reselect";

// select the cart off the state
const selectCartReducer = (state) => state.cart;

// select and memoize cart items off cart state
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

//select and memoize cartOpen state off cart state
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
