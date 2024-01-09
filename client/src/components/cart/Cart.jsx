import { useState, useEffect } from "react";
import "./Cart.scss";

export default function Cart({setShowCart}) {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : []);
  
  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       const storedCartItems = localStorage.getItem("cartItems");
  //       console.log("Stored Cart Items:", storedCartItems);
  //       storedCartItems.map(storedItem => {
  //         console.log(storedCartItem)
  //       })
  //       const parsedCartItems = JSON.parse(storedCartItems) || [];
  //       setCartItems(parsedCartItems);
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   };

  //   fetchCartItems();
  // }, [cartItems]);
  
  return (
    <div className="cart">
      <div className="cart-container">
        {cartItems.length > 0 && cartItems.map(cartItem => (
          <div className="cart-item" key={cartItem.id}>
            <span>{cartItem.title}</span>
            <span>{cartItem.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
