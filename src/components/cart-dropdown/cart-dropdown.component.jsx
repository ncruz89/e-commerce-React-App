import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";

const CartDropdown = () => {
  // const [dropdown, setDropdown] = useState("");

  // const dropdownToggleHandler = () => {
  //   if (!dropdown) setDropdown("cart-dropdown-container");
  //   else setDropdown("");
  // };

  return (
    <div className={"cart-dropdown-container"}>
      <div className="cart-items" />
      <Button type="button">GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
