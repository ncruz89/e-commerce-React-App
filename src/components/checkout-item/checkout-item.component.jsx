import "./checkout-item.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, decreaseItemQuantity, increaseItemQuantity } =
    useContext(CartContext);

  const removeCartItem = () => removeItemFromCart(cartItem.id);

  const decreaseQuantity = () => decreaseItemQuantity(cartItem.id, "-");

  const increaseQuantity = () => increaseItemQuantity(cartItem.id, "+");

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={cartItem.imageUrl} alt={`${cartItem.name}`} />
      </div>

      <span className="name">{cartItem.name} </span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseQuantity}>
          &#10094;
        </div>
        <span className="value">{cartItem.quantity}</span>
        <div className="arrow" onClick={increaseQuantity}>
          &#10095;
        </div>
      </span>
      <span className="price">${cartItem.price * cartItem.quantity}</span>
      <div className="remove-button" onClick={removeCartItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
