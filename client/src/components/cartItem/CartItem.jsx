import React from 'react';
import "./CartItem.scss";

export default function CartItem({ cartItem, onIncrement, onDecrement }) {
  return (
    <div className="cart-item" key={cartItem._id}>
      <img
        src={`../../public/uploads/artworks/${cartItem.image}`}
        className="cart-item--left"
        alt=""
      />
      <div className="cart-item--right">
        <p className="cart-item__title">{cartItem.title}</p>
        <div className="cart-item__price-n-quantity">
          <span className="cart-item__price">${cartItem.price}</span>
          <div className="cart-item__quantity">
            <i
              className="fa-solid fa-minus"
              onClick={() => onDecrement(cartItem._id)} // Pass the itemId to onDecrement
            ></i>
            <span>{cartItem.quantity}</span>
            <i
              className="fa-solid fa-plus"
              onClick={() => onIncrement(cartItem._id)} // Pass the itemId to onIncrement
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
