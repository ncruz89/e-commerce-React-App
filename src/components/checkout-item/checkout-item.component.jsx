import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

// CheckoutItem component
// receives cartItem parameter
// renders CheckoutItemContainer that houses an image of product along with name, quantity and quantity adjusters, price and remove button
// added memo method to prevent re-renders of items already in cart when mapping through cart items every time quantity change or new product added to cart.
const CheckoutItem = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // clearItemHandler that sends dispatch to update cartItems state by calling clearItemFromCart
  // called via onClick prop on RemoveButton styled component
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  // addItemhandler that sends dispatch to update cartItems state by calling addItemToCart
  // called via on click on increment quantity arrow component
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  // removeItemhandler that sends dispatch to update cartItems state by calling removeItemFromCart
  // called via on click on decrement quantity arrow component
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> ${price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
