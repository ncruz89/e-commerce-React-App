import { memo } from "react";

import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles.jsx";

// CartItem component
// receives cartItem parameter
// renders a cart item that houses product image, name, quantity and price

// add memo method to prevent re-renders of products being added multiple times. Now only quantities are updated but individual products aren't re-rendered because of quantity change.
const CartItem = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
