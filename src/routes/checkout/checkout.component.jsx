import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

// Checkout component
// sets up layout for checkout page
// maps through cartItems array and renders each cartItem as a CheckoutItem component
// Also renders Total and stripe PaymentForm component

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((cartItem) => {
        return <CheckoutItem cartItem={cartItem} key={cartItem.id} />;
      })}
      <Total>
        {cartItems.length > 0 ? `Total: $${cartTotal}` : "cart is empty"}
      </Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
