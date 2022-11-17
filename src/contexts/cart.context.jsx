import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItemIndex !== -1) {
    cartItems[existingCartItemIndex].quantity += 1;
    return [...cartItems];
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, id) => {
  const newCartItems = cartItems.filter((item) => item.id !== id);

  return [...newCartItems];
};

const changeCartItemQuantity = (cartItems, id, changeType) => {
  const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);
  if (cartItemIndex === -1) return [...cartItems];
  if (changeType === "+") cartItems[cartItemIndex].quantity += 1;
  if (changeType === "-") {
    cartItems[cartItemIndex].quantity -= 1;
    if (cartItems[cartItemIndex].quantity === 0) {
      cartItems = removeCartItem(cartItems, id);
    }
  }
  return [...cartItems];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  decreaseItemQuantity: () => {},
  increaseItemQuantity: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (id) => {
    setCartItems(removeCartItem(cartItems, id));
  };

  const decreaseItemQuantity = (id, changeType) => {
    setCartItems(changeCartItemQuantity(cartItems, id, changeType));
  };

  const increaseItemQuantity = (id, changeType) =>
    setCartItems(changeCartItemQuantity(cartItems, id, changeType));

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
