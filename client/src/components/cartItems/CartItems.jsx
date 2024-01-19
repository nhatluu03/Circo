import { useState, useEffect } from "react";
import CartItem from "../../components/cartItem/CartItem.jsx";

export default function CartItems({cartItems, setCartItems}) {
  const addToCart = (item) => {
    const updatedCart = [...cartItems, { ...item, quantity: 1 }];
    setCartItems(updatedCart);
  };

  const handleIncrement = (itemId) => {
    console.log(itemId);
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (itemId) => {
    console.log(itemId);
    const updatedCart = cartItems.map((item) => {
      if (item._id === itemId) {
        if (item.quantity === 1) {
          // Remove item from cart when quantity is 1 and decrement is clicked
          return null;
        } else {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    // Filter out null values (removed items) from the cart
    const filteredCart = updatedCart.filter((item) => item !== null);
    setCartItems(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  return (
    <div className="cart-container">
      {cartItems &&
        cartItems.length > 0 &&
        cartItems.map((cartItem) => (
          <CartItem
            key={cartItem._id}
            cartItem={cartItem}
            onIncrement={() => handleIncrement(cartItem._id)}
            onDecrement={() => handleDecrement(cartItem._id)}
          />
        ))}
    </div>
  );
}
