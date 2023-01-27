import { useDispatch, useSelector } from "react-redux";

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

// CartIcon component

// renders CartIconContainer which houses the ShoppingIcon styled component and the cartCount state inside the ItemCount styledComponent
const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  // toggleIsCartOpen handler
  // calls dispatch to set isCartOpen state to the opposite of current state
  // called via onClick on carticoncontainer styled component
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
