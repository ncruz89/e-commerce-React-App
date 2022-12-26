import { createSelector } from "reselect";

// select the cart state off the state
const selectCartReducer = (state) => state.cart;

// select and memoize cart items off cart state
// only runs selectCartItems if selectCartReducer has changed
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// select and memoize cartOpen state off cart state
// only runs selectIsCartOpen if selectCartReducer has changed
// should only be called twice since state can only be open or closed
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// select and memoize cartCount state off selectCartItems
// only runs if selectCartItems has changed
// function reduces over cart items and adds quantity found rendered in cart-icon component
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// select and memoize cartTotal state off selectCartItems
// only runs if selectCartItems has changed
// function reduces over cartItems array and calculates cart total rendered in checkout component
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
