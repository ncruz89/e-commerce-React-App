import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCartItems } from "../../store/cart/cart.selector.js";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

// CartDropdown component

// renders cart dropdown that houses Cart Items and a go to checkout Button
// if cartItems state isn't an empty array then cartItems state is mapped over and renders CartItem component(s)
// else renders an cart is empty message
const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToCheckoutHandler = useCallback(() => {
    dispatch(setIsCartOpen(false));
    navigate("/checkout");
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>cart is empty</EmptyMessage>
        )}
      </CartItems>

      <Button type="button" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
