// Inside Cart.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.scss";
import CartItem from "../cartItem/CartItem.jsx";
import CartItems from "../cartItems/CartItems.jsx";


export default function Cart({ setShowCart }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <div className="cart">
      <div className="cart-content">
        <CartItems cartItems={cartItems} setCartItems={setCartItems}/>
        <Link to="/checkout">
          <button className="btn btn-3 w-100 checkout-btn">Checkout</button>
        </Link>
      </div>
    </div>
  );
}
