import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Arrow,
  RemoveButton,
  Price,
  Value,
} from "./checkout-item.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, decreaseItemQuantity, increaseItemQuantity } =
    useContext(CartContext);

  const removeCartItem = () => removeItemFromCart(cartItem.id);

  const decreaseQuantity = () => decreaseItemQuantity(cartItem.id, "-");

  const increaseQuantity = () => increaseItemQuantity(cartItem.id, "+");

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={cartItem.imageUrl} alt={`${cartItem.name}`} />
      </ImageContainer>

      <Name>{cartItem.name}</Name>
      <Quantity>
        <Arrow onClick={decreaseQuantity}>&#10094;</Arrow>
        <Value>{cartItem.quantity}</Value>
        <Arrow onClick={increaseQuantity}>&#10095;</Arrow>
      </Quantity>
      <Price>${cartItem.price * cartItem.quantity}</Price>
      <RemoveButton onClick={removeCartItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
